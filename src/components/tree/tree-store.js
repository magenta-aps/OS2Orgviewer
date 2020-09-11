import ajax from '../http/http.js'

const state = {
    root_org_unit_uuid: null,
    organisations: null
}

const getters = {
    getRootOrgUnitUuid: state => {
        return state.root_org_unit_uuid
    },
    getOrganisations: state => {
        return state.organisations
    }
}

const mutations = {
    setRootOrgUnitUuid: (state, uuid) => {
        state.root_org_unit_uuid = uuid
    },
    setOrganisations: (state, orgs) => {
        state.organisations = orgs
    }
}

const actions = {
    initFromNothing: ({dispatch, commit}) => {
        ajax(`/service/o/`)
        .then((orgs) => {
            commit('setOrganisations', orgs)
            for (let org in orgs) {
                ajax(`/service/o/${ orgs[org].uuid }/children`)
                .then((tree) => {
                    dispatch('mapTreeToGraph', tree)
                    // We only want to deal with one root. 
                    // Taking the first org unit child and passing it on
                    commit('setRootOrgUnitUuid', tree[0].uuid)
                })
            }
        })
    },
    initFromRoot: ({dispatch, commit}, root_uuid) => {
        ajax(`/service/o/`)
        .then((orgs) => {
            commit('setOrganisations', orgs)
            dispatch('fetchTree', root_uuid)
            .then(() => {
                commit('setRootOrgUnitUuid', root_uuid)
            })
        })
    },
    fetchTree: ({dispatch}, org_unit_uuid) => {
        return ajax(`/service/ou/ancestor-tree?uuid=${ org_unit_uuid }`)
        .then((tree) => {
            dispatch('mapTreeToGraph', tree)
            return tree
        })
    },
    mapTreeToGraph: ({commit, dispatch}, branch) => {
        for (let node in branch) {
            if (branch[node].children) {
                dispatch('mapTreeToGraph', branch[node].children)
                branch[node].child_count = branch[node].children.length
            }
            commit('addNode', branch[node])
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}