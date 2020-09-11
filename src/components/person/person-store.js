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
            dispatch('fetchPersonEngagements', uuid)
            .then(engagements => {
                state.persons[uuid].engagement_data = engagements
                commit('setRootOrgUnitUuid', state.persons[uuid].engagement_data[0].org_unit.uuid)
                dispatch('fetchTree', state.persons[uuid].engagement_data[0].org_unit.uuid)
            })
        })
    },
    fetchEmployees: ({commit}, org_uuid) => {
        commit('setPersons', {})
        ajax(`/service/ou/${ org_uuid }/details/engagement`)
        .then((employees) => {
            let persons = {
                cached: true,
                parent_org_uuid: org_uuid
            }
            for (let employee in employees) {
                persons[employees[employee].person.uuid] = employees[employee]
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
    fetchPersonEngagements: ({}, uuid) => {
        return ajax (`/service/e/${ uuid }/details/engagement`)
        .then((engagements) => {
            return engagements
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