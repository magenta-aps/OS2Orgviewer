import ajax from '../http/http.js'

const state = {
    root_org_uuid: GLOBAL_API_ROOT_UUID, // Defined in index.html
    global_organisations: null
}

const getters = {
    getRootOrgUnitUuid: state => {
        return state.root_org_uuid
    },
    getOrganisations: state => {
        return state.global_organisations
    }
}
const mutations = {
    setRootOrgUnitUuid: (state, uuid) => {
        state.root_org_uuid = uuid
    },
    setOrganisations: (state, orgs) => {
        state.global_organisations = orgs
    }
}
const actions = {
    fetchGlobalOrgs: ({}) => {
        return ajax(`/service/o/`)
        .then(orgs => {
            return orgs
        })
    },
    fetchTree: ({}, org_unit_uuid) => {
        return ajax(`/service/ou/ancestor-tree?uuid=${ org_unit_uuid }`)
        .then(tree => {
            return tree
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}