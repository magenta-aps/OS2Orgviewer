import ajax from '../http/http.js'

const state = {
    managers: []
}

const getters = {
    getManagers: state => {
        return state.managers
    }
}

const mutations = {
    setManagers: (state, managers) => {
        state.managers = managers
    }
}

const actions = {
    fetchManagers: ({}, ou_uuid) => {
        return ajax(`/service/ou/${ ou_uuid }/details/manager?inherit_manager=1`)
        .then(managers => {
            return managers
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}