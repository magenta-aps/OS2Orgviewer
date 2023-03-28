import Vue from "vue"
import { postQuery, ajax } from "../http/http.js"
import { convertToArray } from "../../helpers.js"

const sortAssociations = function (people) {
  let unsorted_persons = []
  for (let person of people) {
    // Note that these weighted criteria might be unique for Frederikshavn Kommune
    // and probably should be configurable
    switch (person.association_type.name) {
      case "Formand":
        person.weight = 10
        break
      case "LR, formand":
        person.weight = 10
        break
      case "LR":
        person.weight = 9
        break
      case "FTR, næstformand":
        person.weight = 8
        break
      case "TR, næstformand":
        person.weight = 8
        break
      case "Medarb.rep, næstformand":
        person.weight = 8
        break
      case "FTR":
        person.weight = 7
        break
      case "TR":
        person.weight = 6
        break
      case "Medarb.rep":
        person.weight = 5
        break
      case "AMR, næstformand":
        person.weight = 4
        break
      case "Næstformand":
        person.weight = 4
        break
      case "AMR":
        person.weight = 3
        break
      case "Leder":
        person.weight = 2
        break
      case "Projektleder":
        person.weight = 1
        break
      default:
        person.weight = 0
    }
    unsorted_persons.push(person)
  }
  return unsorted_persons.sort(function (a, b) {
    return b.weight - a.weight
  })
}

const sortByName = function (people) {
  return people.sort((x, y) => {
    let a = x.employee[0].name,
      b = y.employee[0].name
    return a == b ? 0 : a > b ? 1 : -1
  })
}

const state = {
  org_unit: null,
}

const getters = {
  getOrgUnitData: (state) => {
    if (
      OC_GLOBAL_CONF.VUE_APP_REMOVE_MANAGER_ENGAGEMENT &&
      state.org_unit &&
      state.org_unit.managers.length
    ) {
      state.org_unit.engagements = state.org_unit.engagements.filter((engagement) => {
        return !(
          engagement.employee[0].uuid == state.org_unit.managers[0].employee[0].uuid
        )
      })
    }
    return state.org_unit
  },
}

const mutations = {
  setOrgUnitData: (state, org_unit_data) => {
    state.org_unit = org_unit_data
  },
  setOrgUnitPeople: (state, payload) => {
    let new_org = Object.assign({}, state.orgs[payload.org_uuid])
    new_org.person_data = payload.persons
    Vue.set(state.orgs, payload.org_uuid, new_org)
  },
  clearOrgUnitData: (state) => {
    state.org_unit = null
  },
}

const actions = {
  fetchOrgUnitAddresses: ({}, uuid) => {
    return ajax(`/service/ou/${uuid}/details/address`).then((addresses) => {
      return addresses
    })
  },
  fetchOrgUnitData: ({ commit, rootState }, org_unit_uuid) => {
    let by_association = rootState.relation_type === "association" ? true : false

    // Remove any single or double quotes, `[` and `]` and spaces. Now we have a string of UUIDs seperated by comma.
    // Then split() by comma(,), which gives an array of uuids.
    let hierarchies_filter = rootState.org_unit_hierarchy_uuids
      ? convertToArray(rootState.org_unit_hierarchy_uuids)
      : null

    postQuery({
      query: `
      query GetOrgUnit($uuid: [UUID!], $hierarchies: [UUID!], $by_association: Boolean!) {
        org_units(uuids: $uuid, hierarchies: $hierarchies) {
          uuid
          objects {
            name
            addresses {
              uuid
              value
              visibility {
                name
              }
              address_type {
                uuid
                name
                user_key
                scope
              }
            }
            ...association_or_engagement
          }
        }
      }

      fragment association_or_engagement on OrganisationUnit {
        associations @include(if: $by_association) {
          substitute {
            uuid
            name
          }
          employee {
            uuid
            name
          }
          association_type {
            name
          }
          dynamic_class {
            name
            parent {
              name
            }
          }
        }
        managers(inherit: true) @skip(if: $by_association) {
          org_unit_uuid
          manager_type {
            uuid
            name
          }
          employee {
            uuid
            name
          }
        }
        engagements @skip(if: $by_association) {
          org_unit_uuid
          engagement_type_uuid
          employee {
            uuid
            name
          }
          job_function {
            name
          }
          extension_2
        }
      }
    `,
      variables: {
        uuid: org_unit_uuid,
        hierarchies: hierarchies_filter,
        by_association: by_association,
      },
    }).then((res) => {
      let org_unit = res["org_units"][0].objects[0]
      org_unit.uuid = res["org_units"][0].uuid
      if (by_association) {
        org_unit.associations = sortAssociations(org_unit.associations)
      }
      if (!by_association) {
        org_unit.associations = sortByName(org_unit.engagements)
      }
      commit("setOrgUnitData", org_unit)
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
