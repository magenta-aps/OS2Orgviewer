import {postQuery} from '../http/http.js'

const state = {
    person: null
}

const getters = {
    getPerson: state => {
        return state.person
    }
}
const mutations = {
    setPerson: (state, person) => {
        state.person = person
    }
}
const actions = {
    fetchPerson: ({commit, rootState}, uuid) => {
        let relation_query = ''
        if (rootState.relation_type === 'association') {
            relation_query = `
                associations {
                    org_unit_uuid,
                    association_type {
                        name
                    },
                    substitute {
                        uuid
                        name
                    },
                    dynamic_class {
                        name
                        parent {
                            name
                        }
                    }
                                      
                }
            `
        } else {
            relation_query = `
                engagements {
                    org_unit_uuid,
                    engagement_type {
                        name
                    },
                    job_function {
                        name
                    }
                }
            `
        }
        return postQuery({"query": `
            {
                employees(uuids:"${uuid}") {
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

            let person = res.employees[0].objects[0]
            person.uuid = res.employees[0].uuid

            commit('setPerson', person)
            return person
        })
    },
    fetchPersonWorkAddress: ({rootState}, uuid) => {
        let relation_query = ''
        if (rootState.relation_type === 'association') {
            relation_query = `
                associations {
                    org_unit {
                        uuid,
                        addresses {
                            uuid,
                            value,
                            address_type {
                                scope,
                                name
                            }
                        }
                    }
                }
            `
        } else {
            relation_query = `
                engagements {
                    org_unit {
                        uuid,
                        addresses {
                            uuid,
                            value,
                            address_type {
                                scope,
                                name
                            }
                        }
                    }
                }
            `
        }
        return postQuery({"query": `
            {
                employees(uuids:"${uuid}") {
                    uuid,
                    objects {
                        ${relation_query}    
                    }
                }	  
            }
        `})
        .then(res => {

            if (rootState.relation_type === 'association') {
                return res.employees[0].objects[0].associations[0].org_unit[0].addresses
            } else {
                return res.employees[0].objects[0].engagements[0].org_unit[0].addresses
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
