import { postQuery } from "../http/http.js"

const state = {
  person: null,
}

const getters = {
  getPerson: (state) => {
    return state.person
  },
}
const mutations = {
  setPerson: (state, person) => {
    state.person = person
  },
}
const actions = {
  fetchPerson: ({ commit, rootState }, uuid) => {
    let by_association = rootState.relation_type === "association" ? true : false
    return postQuery({
      query: `
      query GetPerson($uuid: [UUID!], $by_association: Boolean!) {
        employees(uuids: $uuid) {
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
                scope
              }
            }
            ...association_or_engagement
          }
        }
      }

      fragment association_or_engagement on Employee {
        associations @include(if: $by_association) {
          org_unit_uuid
          association_type {
            name
          }
          substitute {
            uuid
            name
          }
          dynamic_class {
            name
            parent {
              name
            }
          }
        }
        engagements @skip(if: $by_association) {
          org_unit_uuid
          engagement_type {
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
        uuid: uuid,
        by_association: by_association,
      },
    }).then((res) => {
      let person = res.employees[0].objects[0]
      person.uuid = res.employees[0].uuid

      commit("setPerson", person)
      return person
    })
  },
  fetchPersonWorkAddress: ({ rootState }, uuid) => {
    return postQuery({
      query: `
      query getOrgUnitAddress($uuid: [UUID!]) {
        employees(uuids: $uuid) {
          objects {
            engagements {
              org_unit {
                addresses {
                  value
                  address_type {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
      variables: { uuid: uuid },
    }).then((res) => {
      return res.employees[0].objects[0].engagements[0].org_unit[0].addresses
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
