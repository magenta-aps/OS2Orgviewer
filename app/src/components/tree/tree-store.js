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
  mutations.setTreeLoadStatus(state, false)
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
  setTreeLoadStatus: (state, status_bool) => {
    state.tree_is_loading = status_bool
  },
  setChildrenForOrgUnit(state, { parentUuid, children }) {
    const parentOrgUnit = state.org_units[parentUuid]
    if (parentOrgUnit) {
      Vue.set(parentOrgUnit, "children", children) // This ensures reactivity
      parentOrgUnit.hasFetchedChildren = true
    }
  },
}
const actions = {
  buildTree: ({ commit, state, dispatch }, { uuids, route }) => {
    // Assumes `uuids` is an array
    commit("setTreeLoadStatus", true)

    const uuid_set = new Set(uuids)
    let uuid_array = []
    uuid_set.forEach(function (uuid) {
      if (!state.org_units[uuid]) {
        uuid_array.push(uuid)
      }
    })
    if (uuid_array.length > 0) {
      dispatch("fetchOrgUnitsInTree", uuid_array).then((orgs) => {
        commit("setOrgUnits", orgs)

        let additional_uuids = orgs
          .filter(function (org) {
            return org.parent !== null // Ensure the org has a parent
          })
          .map(function (org) {
            return org.parent.uuid // Collect parent UUIDs for further fetching
          })

        if (additional_uuids.length > 0) {
          dispatch("buildTree", { uuids: additional_uuids, route: route })
        } else {
          dispatch("fetchAndStoreVisibleOrgUnitChildren", route)
        }
      })
    } else {
      // If no new org units to fetch, directly fetch visible children if necessary
      dispatch("fetchAndStoreVisibleOrgUnitChildren", route)
    }
  },
  fetchOrgUnitsInTree: ({ rootState }, uuids) => {
    let by_association = rootState.relation_type === "association" ? true : false
    // This whole if/else is needed, since having `descendant` in the query, will not work correctly, when `hierarchies` are not provided
    let variables
    if (rootState.org_unit_hierarchy_uuids) {
      variables = {
        filter: {
          uuids: uuids,
          descendant: { hierarchy: { uuids: rootState.org_unit_hierarchy_uuids } },
        },
        childFilter: {
          descendant: { hierarchy: { uuids: rootState.org_unit_hierarchy_uuids } },
        },
        by_association: by_association,
      }
    } else {
      variables = {
        filter: {
          uuids: uuids,
        },
        by_association: by_association,
      }
    }

    return postQuery({
      query: `
      query GetOrgUnitsInTree($filter: OrganisationUnitFilter!, $childFilter: ParentsBoundOrganisationUnitFilter, $by_association: Boolean!) {
        org_units(filter: $filter) {
          objects {
            uuid
            current {
              parent {
                uuid
              }
              child_count(filter: $childFilter)
              name
              org_unit_level {
                uuid
              }
              ...association_or_engagement
            }
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
      variables: variables,
    }).then((res) => {
      if (!res) {
        return []
      }
      if (state.hide_org_unit_uuids) {
        res["org_units"]["objects"] = res["org_units"]["objects"].filter(
          (org) => !state.hide_org_unit_uuids.includes(org.uuid)
        )
      }
      if (state.hide_org_units_by_name) {
        res["org_units"]["objects"] = res["org_units"]["objects"].filter(
          (org) =>
            !state.hide_org_units_by_name.some((substring) =>
              org.current.name.includes(substring)
            )
        )
      }

      if (state.hide_org_unit_levels) {
        res["org_units"]["objects"] = res["org_units"]["objects"].filter(
          (org) =>
            !org.current.org_unit_level?.uuid ||
            !state.hide_org_unit_levels.includes(org.current.org_unit_level.uuid)
        )
      }

      return res["org_units"]["objects"].map((org) => {
        let obj = org.current
        obj.uuid = org.uuid
        return obj
      })
    })
  },
  fetchChildrenForOrgUnit: ({ rootState, commit }, parentUuid) => {
    let by_association = rootState.relation_type === "association" ? true : false
    // This whole if/else is needed, since having `descendant` in the query, will not work correctly, when `hierarchies` are not provided
    let variables
    if (rootState.org_unit_hierarchy_uuids) {
      variables = {
        filter: {
          parent: { uuids: parentUuid },
          descendant: { hierarchy: { uuids: rootState.org_unit_hierarchy_uuids } },
        },
        childFilter: {
          descendant: { hierarchy: { uuids: rootState.org_unit_hierarchy_uuids } },
        },
        by_association: by_association,
      }
    } else {
      variables = {
        filter: {
          parent: { uuids: parentUuid },
        },
        by_association: by_association,
      }
    }

    return postQuery({
      query: `
        query GetChildrenForOrgUnit($filter: OrganisationUnitFilter!, $childFilter: ParentsBoundOrganisationUnitFilter, $by_association: Boolean!) {
          org_units(filter: $filter) {
            objects {
              uuid
              current {
                parent {
                  uuid
                }
                child_count(filter: $childFilter)
                name
                org_unit_level {
                  uuid
                }
                ...association_or_engagement
              }
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
      variables,
    }).then((res) => {
      if (!res || !res.org_units || !res.org_units.objects) {
        return []
      }

      // Create an array of child objects without setting hasFetchedChildren
      const childObjects = res.org_units.objects.map((org) => ({
        ...org.current,
        uuid: org.uuid,
      }))

      // Commit the mutation to update the store with the fetched children
      commit("setChildrenForOrgUnit", { parentUuid, children: childObjects })
      commit("setOrgUnits", childObjects)
      return childObjects // Optional
    })
  },
  fetchAndStoreVisibleOrgUnitChildren: async ({ commit, state, dispatch }, route) => {
    const { rootOrgUnitId, orgUnitId } = route.params
    const additionalChildUuids = new Set()

    // Fetch and add children for the root organization unit
    if (rootOrgUnitId && !state.org_units[rootOrgUnitId]?.children) {
      const rootChildren = await dispatch("fetchChildrenForOrgUnit", rootOrgUnitId)

      if (rootChildren.length > 0) {
        rootChildren.forEach((child) => additionalChildUuids.add(child.uuid))
      }

      // Ensure the root org unit itself is in state.org_units
      if (!state.org_units[rootOrgUnitId]) {
        const rootOrgUnit = await dispatch("fetchOrgUnitById", rootOrgUnitId)
        commit("setOrgUnits", { [rootOrgUnitId]: rootOrgUnit })
      }
    }

    // Fetch and add children for the specified org unit in the route's first parameter
    if (orgUnitId && !state.org_units[orgUnitId]?.children) {
      const orgUnitChildren = await dispatch("fetchChildrenForOrgUnit", orgUnitId)

      if (orgUnitChildren.length > 0) {
        orgUnitChildren.forEach((child) => additionalChildUuids.add(child.uuid))
      }

      // Ensure the org unit itself is in state.org_units
      if (!state.org_units[orgUnitId]) {
        const orgUnit = await dispatch("fetchOrgUnitById", orgUnitId)
        commit("setOrgUnits", { [orgUnitId]: orgUnit })
      }
    }

    // Convert set to array and filter out any already-loaded children
    const uuidArray = Array.from(additionalChildUuids).filter(
      (uuid) => !state.org_units[uuid]
    )

    // Fetch and commit additional org units if necessary
    if (uuidArray.length > 0) {
      const orgUnits = await dispatch("fetchOrgUnitsInTree", uuidArray)
      commit("setOrgUnits", orgUnits)
    }

    // Final callback after loading
    onLoadEndHandler(route)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
