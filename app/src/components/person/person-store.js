import ajax from '../http/http.js'
import Vue from 'vue'

const state = {
    persons: {},
    current_person_uuid: null,
    queue: []
}

const getters = {
    getPersons: state => {
        return state.persons
    },
    getPerson: state => uuid => {
        return state.persons[uuid]
    }
}
const mutations = {
    setPerson: (state, person) => {
        state.persons[person.uuid] = person
    },
    popLoadQueue: (state) => {
        state.queue.pop()
    },
    pushLoadQueue: (state) => {
        state.queue.push(1)
    }
}
const actions = {
    fetchPersons: ({dispatch, rootState}, options) => {
        if (!rootState.organisation.orgs[options.org_uuid].person_data) {        
            let relation_type = options.relation ? options.relation : 'engagement'
            ajax(`/service/ou/${ options.org_uuid }/details/${ relation_type }`)
            .then(relations => {
                let payload = {
                    org_uuid: options.org_uuid,
                    queue: relations.length,
                    persons: []
                }
                for (let r in relations) {
                    payload.persons.push(relations[r].person.uuid)
                    dispatch('fetchPerson', relations[r].person.uuid)
                }
                dispatch('awaitPersonData', payload)
            })
        }
    },
    awaitPersonData: ({dispatch, state, commit}, payload) => {
        setTimeout(() => {
            if (state.queue.length > 0) {
                dispatch('awaitPersonData', payload)
            } else {
                commit('setOrgUnitPeople', payload)
            }
        }, 500)
    },
    fetchPerson: ({state, commit, dispatch}, uuid) => {
        if (!state.persons[uuid]) {

            let responses = {
                person: null,
                address_data: null,
                association_data: null,
                engagement_data: null
            }

            commit('pushLoadQueue')

            ajax(`/service/e/${ uuid }/`)
            .then(person => {
                responses.person = person
            })
            ajax(`/service/e/${ uuid }/details/address`)
            .then(addresses => {
                responses.address_data = addresses
            })
            ajax(`/service/e/${ uuid }/details/association`)
            .then(associations => {
                responses.association_data = associations
            })
            ajax(`/service/e/${ uuid }/details/engagement`)
            .then(engagements => {
                responses.engagement_data = engagements
            })

            dispatch('awaitPersonAPIresponses', responses)
        }
    },
    awaitPersonAPIresponses: ({dispatch, commit, state}, res) => {
        setTimeout(() => {
            if (!res.person || !res.address_data || !res.association_data || !res.engagement_data) {
                dispatch('awaitPersonAPIresponses', res)
            } else { 
                let person = res.person
                person.address_data = res.address_data
                person.association_data = res.association_data
                person.engagement_data = res.engagement_data
                
                Vue.set(state.persons, res.person.uuid, res.person)
                commit('popLoadQueue')
            }
        }, 300)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}