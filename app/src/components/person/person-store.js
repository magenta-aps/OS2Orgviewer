import Vue from 'vue'
import ajax from '../http/http.js'

const state = {
    persons: {},
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
    }
}
const mutations = {
    setPersons: (state, persons) => {
        state.persons = persons
    },
    updatePerson: (state, person) => {
        if (!state.persons[person.uuid]) {
            Vue.set(state.persons, person.uuid, person)
        } else {
            let new_person = Object.assign({}, person, state.persons[person.uuid])
            Vue.set(state.persons, person.uuid, new_person)
        }
    },
    setManagers: (state, managers) => {
        state.managers = managers
    }
}
const actions = {
    fetchAssociatedPeople: ({commit}, org_uuid) => {
        commit('setPersons', {})
        ajax(`/service/ou/${ org_uuid }/details/association`)
        .then((people) => {
            for (let p in people) {
                commit('updatePerson', people[p])   
            }
        })
    },
    fetchPerson: ({state, commit, dispatch}, uuid) => {
        if (!state.persons[uuid] || !state.persons[uuid].address_data) {
            return dispatch('fetchPersonByHttp', uuid)
            .then((person) => {
                dispatch('fetchPersonAddresses', uuid)
                .then(addresses => {
                    person.address_data = addresses
                    dispatch('fetchPersonAssociations', uuid)
                    .then(associations => {
                        person.association_data = associations
                        commit('updatePerson', person)
                    })
                })
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