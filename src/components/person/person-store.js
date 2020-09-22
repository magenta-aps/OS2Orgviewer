import Vue from 'vue'
import ajax from '../http/http.js'

const state = {
    persons: {},
    active_person_uuid: null,
    managers: null
}

const getters = {
    getPersons: state => {
        return state.persons
    },
    getPerson: state => uuid => {
        return state.persons[uuid]
    },
    getManagers: state => {
        return state.managers
    },
    getActivePersonUuid: state => {
        return state.active_person_uuid
    }
}
const mutations = {
    setPersons: (state, persons) => {
        state.persons = persons
    },
    addPerson: (state, person) => {
        if (!state.persons[person.uuid]) {
            Vue.set(state.persons, person.uuid, person)
        }
    },
    setManagers: (state, managers) => {
        state.managers = managers
    },
    setActivePersonUuid: (state, uuid) => {
        state.active_person_uuid = uuid
    }
}
const actions = {
    initFromPerson({commit, dispatch, state}, uuid) {
        dispatch('fetchPerson', uuid)
        .then(person => {
            dispatch('fetchPersonAssociations', uuid)
            .then(associations => {
                state.persons[uuid].association_data = associations
                dispatch('fetchTree', state.persons[uuid].association_data[0].org_unit.uuid)
                .then(tree => {
                    dispatch('mapTreeToGraph', tree)
                })
            })
        })
    },
    fetchAssociatedPeople: ({commit}, org_uuid) => {
        commit('setPersons', {})
        ajax(`/service/ou/${ org_uuid }/details/association`)
        .then((people) => {
            let persons = {
                cached: true,
                parent_org_uuid: org_uuid
            }
            for (let p in people) {
                persons[people[p].person.uuid] = people[p]
            }
            commit('setPersons', persons)
        })
    },
    fetchPerson: ({state, commit, dispatch}, uuid) => {
        if (!state.persons[uuid]) {
            return dispatch('fetchPersonByHttp', uuid)
            .then((person) => {
                dispatch('fetchPersonAddresses', uuid)
                .then(addresses => {
                    person.address_data = addresses
                })
                commit('addPerson', person)
                return person
            })
        } else {
            return state.persons[uuid]
        }
    },
    fetchPersonByHttp: ({}, uuid) => {
        return ajax(`/service/e/${ uuid }/`)
        .then((person) => {
            return person
        })
    },
    fetchPersonAddresses: ({}, uuid) => {
        return ajax(`/service/e/${ uuid }/details/address`)
        .then((addresses) => {
            return addresses
        })
    },
    fetchPersonAssociations: ({}, uuid) => {
        return ajax (`/service/e/${ uuid }/details/association`)
        .then((associations) => {
            return associations
        })
    },
    fetchManagers: ({commit}, uuid) => {
        ajax(`/service/ou/${ uuid }/details/manager`)
        .then((managers) => {
            commit('setManagers', managers)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}