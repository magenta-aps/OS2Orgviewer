import Vue from "vue"
import { postQuery } from "../http/http.js"
import { convertToArray, convertToBoolean } from "../../helpers.js"

const setParentOrgUnitVisibility = function (parent_uuid) {
  let new_parent = state.org_units[parent_uuid]
  new_parent.showchildren = true
  if (new_parent.parent !== null) {
    setParentOrgUnitVisibility(new_parent.parent.uuid)
  }
  mutations.setOrgUnit(state, new_parent)
}

const setOrgUnitVisibility = function (route) {
  // Set `showchildren` true for org.unit that is focused according to route params
  // Then check its parents and set `showchildren` for them as well
  if (route) {
    let focused_org = state.org_units[route.params.orgUnitId]
    if (route.query.showchildren === "false") {
      // Do nothing
    } else {
      focused_org.showchildren = true
    }
    if (focused_org.parent) {
      setParentOrgUnitVisibility(focused_org.parent.uuid)
    }
    mutations.setOrgUnit(state, focused_org)
  }
}

const onLoadEndHandler = function (route) {
  // This is the last thing we do when building Tree
  setOrgUnitVisibility(route)
  mutations.setTreeLoadSTatus(state, false)
}

const state = {
  root_uuid: OC_GLOBAL_CONF.VUE_APP_ROOT_UUID,
  org_unit_hierarchy_uuids: convertToArray(
    OC_GLOBAL_CONF.VUE_APP_ORG_UNIT_HIERARCHY_UUIDS
  ),
  org_units: {},
  tree_is_loading: false,
  hide_org_unit_uuids: convertToArray(OC_GLOBAL_CONF.VUE_APP_HIDE_ORG_UNIT_UUIDS),
  hide_org_units_by_name: convertToArray(OC_GLOBAL_CONF.VUE_APP_HIDE_ORG_UNITS_BY_NAME),
  hide_org_unit_levels: convertToArray(OC_GLOBAL_CONF.VUE_APP_HIDE_ORG_UNIT_LEVELS),
}

const getters = {
  getOrgUnits: (state) => {
    return state.org_units
  },
  getRootUuid: (state) => {
    return state.root_uuid
  },
  getOrgUnitHierarchyUuid: (state) => {
    return state.org_unit_hierarchy_uuids
  },
  getTreeOrgUnit: (state) => (uuid) => {
    return state.org_units[uuid]
  },
  getTreeLoadStatus: (state) => {
    return state.tree_is_loading
  },
}
const mutations = {
  setRootUuid: (state, uuid) => {
    state.root_uuid = uuid
  },
  setOrgUnit: (state, org_unit) => {
    let new_org = Object.assign({}, org_unit, state.org_units[org_unit.uuid])
    Vue.set(state.org_units, org_unit.uuid, new_org)
  },
  setOrgUnits: (state, org_units) => {
    if (org_units.length) {
      let new_orgs = Object.assign({}, state.org_units)
      for (let org of org_units) {
        if (!new_orgs[org.uuid]) {
          new_orgs[org.uuid] = org
        } else {
          new_orgs[org.uuid] = Object.assign({}, new_orgs[org.uuid], org)
        }
      }
      state.org_units = new_orgs
    }
  },
  setTreeLoadSTatus: (state, status_bool) => {
    state.tree_is_loading = status_bool
  },
}
const actions = {
  buildTree: ({ commit, state, dispatch }, { uuids, route }) => {
    // Assumes `uuids` is an array

    commit("setTreeLoadSTatus", true)

    const uuid_set = new Set(uuids) // Creating a Set removes duplicate uuids
    let uuid_array = []
    uuid_set.forEach(function (uuid) {
      if (!state.org_units[uuid]) {
        // Only add uuid to query if data does not exist in state
        uuid_array.push(uuid)
      }
    })
    if (uuid_array.length > 0) {
      dispatch("fetchOrgUnitsInTree", uuid_array).then((orgs) => {
        commit("setOrgUnits", orgs)

        // Check if orgs have parents we need to fetch
        let additional_uuids = orgs
          .filter(function (org) {
            return org.parent !== null
          })
          .map(function (org) {
            return org.parent.uuid
          })

        // Rerun if additional uuids are wanted
        if (additional_uuids.length > 0) {
          dispatch("buildTree", { uuids: additional_uuids, route: route })
        } else {
          // This is the next to last thing we do when building Tree
          dispatch("fetchVisibleOrgUnitChildren", route)
        }
      })
    } else {
      // This is the next to last thing we do when building Tree
      dispatch("fetchVisibleOrgUnitChildren", route)
    }
  },
  fetchOrgUnitsInTree: ({ rootState }, uuids) => {
    let by_association = rootState.relation_type === "association" ? true : false

    return postQuery({
      query: `
      query GetOrgUnitsInTree($uuids: [UUID!], $hierarchies: [UUID!], $by_association: Boolean!) {
        org_units(uuids: $uuids, hierarchies: $hierarchies) {
          uuid
          objects {
            parent {
              uuid
            }
            children(hierarchies: $hierarchies) {
              name
              uuid
            }
            name
            org_unit_level_uuid
            ...association_or_engagement
          }
        }
      }

      fragment association_or_engagement on OrganisationUnit {
        associations @include(if: $by_association) {
          uuid
        }
        engagements @skip(if: $by_association) {
          uuid
          engagement_type_uuid
        }
      }
    `,
      variables: {
        uuids: uuids,
        hierarchies: rootState.org_unit_hierarchy_uuids,
        by_association: by_association,
      },
    }).then((res) => {
      if (!res) {
        return []
      }
      if (state.hide_org_unit_uuids) {
        res["org_units"] = res["org_units"].filter(
          (org) => !state.hide_org_unit_uuids.includes(org.uuid)
        )
      }
      if (state.hide_org_units_by_name) {
        res["org_units"] = res["org_units"].filter(
          (org) =>
            !state.hide_org_units_by_name.some((substring) =>
              org.objects[0].name.includes(substring)
            )
        )
      }

      if (state.hide_org_unit_levels) {
        res["org_units"] = res["org_units"].filter(
          (org) =>
            !state.hide_org_unit_levels.includes(org.objects[0].org_unit_level_uuid)
        )
      }

      return res["org_units"].map((org) => {
        let obj = org.objects[0]
        obj.uuid = org.uuid
        return obj
      })
    })
  },
  fetchVisibleOrgUnitChildren: ({ commit, state, dispatch }, route) => {
    let additional_child_uuids = new Set()

    const cycle_parents = function (child_uuids, org_unit) {
      const org_unit_from_state = state.org_units[org_unit.uuid]
      org_unit_from_state.children.forEach(function (child) {
        child_uuids.add(child.uuid)
      })
      // Checking that org unit uuid is not null and not identitical to its parent's
      if (
        org_unit_from_state.parent !== null &&
        org_unit_from_state.parent.uuid !== org_unit_from_state.uuid
      ) {
        cycle_parents(child_uuids, org_unit_from_state.parent)
      }
    }

    if (route && route.params.orgUnitId) {
      const org_unit = state.org_units[route.params.orgUnitId]
      org_unit.children.forEach(function (child) {
        additional_child_uuids.add(child.uuid)
      })
      if (org_unit.parent !== null) {
        cycle_parents(additional_child_uuids, org_unit.parent)
      }
    } else {
      state.org_units[state.root_uuid].children.forEach(function (child) {
        additional_child_uuids.add(child.uuid)
      })
    }

    // When we have a list of uuids, fetch them
    let uuid_array = []
    additional_child_uuids.forEach(function (uuid) {
      if (!state.org_units[uuid]) {
        // Only add uuid to query if data does not exist in state
        uuid_array.push(uuid)
      }
    })
    if (uuid_array.length > 0) {
      dispatch("fetchOrgUnitsInTree", uuid_array).then((orgs) => {
        commit("setOrgUnits", orgs)
        onLoadEndHandler(route)
      })
    } else {
      onLoadEndHandler(route)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
