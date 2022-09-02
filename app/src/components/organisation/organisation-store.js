import Vue from 'vue'
import {postQuery, ajax} from '../http/http.js'

const sortAssociations = function(people) {
    let unsorted_persons = []
    for (let person of people) {
        // Note that these weighted criteria might be unique for Frederikshavn Kommune
        // and probably should be configurable
        switch (person.association_type.name) {
            case 'Formand':
                person.weight = 10
            break
            case 'LR, formand':
                person.weight = 10
            break
            case 'LR':
                person.weight = 9
            break
            case 'FTR, næstformand':
                person.weight = 8
            break
            case 'TR, næstformand':
                person.weight = 8
            break
            case 'Medarb.rep, næstformand':
                person.weight = 8
            break
            case 'FTR':
                person.weight = 7
            break
            case 'TR':
                person.weight = 6
            break
            case 'Medarb.rep':
                person.weight = 5
            break
            case 'AMR, næstformand':
                person.weight = 4
            break
            case 'Næstformand':
                person.weight = 4
            break
            case 'AMR':
                person.weight = 3
            break
            case 'Leder':
                person.weight = 2
            break
            case 'Projektleder':
                person.weight = 1
            break
            default:
                person.weight = 0
        }
        unsorted_persons.push(person)
    }
    return unsorted_persons.sort(function(a,b) {
        return b.weight - a.weight
    })
}

const state = {
    org_unit: null
}

const getters = {
    getOrgUnitData: (state) => {
        return state.org_unit
    }
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
    }
}

const actions = {
    fetchOrgUnitAddresses: ({}, uuid) => {
        return ajax(`/service/ou/${ uuid }/details/address`)
        .then(addresses => {
            return addresses
        })
    },
    fetchOrgUnitData: ({commit, rootState}, org_unit_uuid) => {
        let relation_query = ''
        if (rootState.relation_type === 'association') {
            relation_query = `
                associations {
                    substitute_uuid,
                    employee {
                        uuid,
                        name
                    },
                    association_type {
                        name
                    },
                    dynamic_class {
                        uuid
                    }
                }
            `
        } else {
            relation_query = `
                managers(inherit:true) {
                    org_unit_uuid,
                    manager_type {
                        uuid,
                        name
                    },
                    employee {
                        uuid,
                        name
                    }
                },
                engagements {
                    org_unit_uuid,
                    employee {
                        uuid,
                        name
                    },
                    job_function {
                        name
                    }
                }
            `
        }
        postQuery({"query": `
            {   
                org_units(uuids:"${org_unit_uuid}") {
                    uuid,
                    objects {
                        name,
                        addresses {
                            uuid,
                            value,
                            visibility {
                                name
                            },
                            address_type {
                                uuid,
                                name,
                                scope
                            }
                        },
                        ${relation_query}
                    }
                }
            }
        `})
        .then(res => {
            
            let org_unit = res['org_units'][0].objects[0]
            org_unit.uuid = res['org_units'][0].uuid
            if (rootState.relation_type === 'association') {
                org_unit.associations = sortAssociations(org_unit.associations)
            }
            commit('setOrgUnitData', org_unit)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
