import Vue from 'vue'
import ajax from '../http/http.js'

const mapTreeToGraph = function(branch, parent_uuid) {
    for (let n in branch) {
        branch[n].parent_uuid = parent_uuid
        if (branch[n].children) {
            branch[n].showchildren = true
            mapTreeToGraph(branch[n].children, branch[n].uuid)
        } else {
            branch[n].showchildren = false
        }
        mutations.updateNode(state, branch[n])
    }
}

const state = {
    graph: {},
    root_org_uuid: GLOBAL_API_ROOT_UUID, // Defined in index.html
    global_organisations: null
}

const getters = {
    getGraph: state => {
        return state.graph
    }, 
    getOrgUnit: (state) => (org_unit_uuid) => {
        return state.graph[org_unit_uuid]
    },
    getChildren: (state) => (org_unit_uuid) => {
        let nodes = []
        for (let c in state.graph[org_unit_uuid].child_list) {
            nodes.push(state.graph[state.graph[org_unit_uuid].child_list[c]])
        }
        return nodes
    },
    getRootOrgUnitUuid: state => {
        return state.root_org_uuid
    },
    getOrganisations: state => {
        return state.global_organisations
    }
}
const mutations = {
    updateNode: (state, node_data) => {
        if (!state.graph[node_data.uuid]) {
            Vue.set(state.graph, node_data.uuid, node_data)
        } else if (state.graph[node_data.uuid] !== node_data) {
            let new_node = Object.assign({}, node_data, state.graph[node_data.uuid])
            Vue.set(state.graph, node_data.uuid, new_node)
        } else {
            return
        }
    },
    setRootOrgUuid: (state, uuid) => {
        state.root_org_uuid = uuid
    },
    setOrganisations: (state, orgs) => {
        state.global_organisations = orgs
    }
}
const actions = {
    checkOrgChildren: ({state, dispatch}, org_uuid) => {
        let org = state.graph[org_uuid]
        if (org && !org.child_list) {
            dispatch('fetchOrgUnitChildren', org_uuid)
        }
    },
    fetchGlobalOrgs: ({commit}) => {
        return ajax(`/service/o/`)
        .then(orgs => {
            commit('setOrganisations', orgs)
            return orgs
        })
    },
    fetchTree: ({}, org_unit_uuid) => {
        return ajax(`/service/ou/ancestor-tree?uuid=${ org_unit_uuid }`)
        .then(tree => {
            mapTreeToGraph(tree, false)
            return tree
        })
    },
    fetchOrgUnit: ({commit, dispatch, state}, uuid) => {
        return ajax(`/service/ou/${ uuid }/`)
        .then(org_unit => {
            commit('updateNode', org_unit)
            dispatch('fetchOrgUnitChildren', uuid)
            return state.graph[uuid]
        })
    },
    fetchOrgUnitChildren: ({commit, state}, uuid) => {
        ajax(`/service/ou/${ uuid }/children`)
        .then((ous) => {
            let parent_node = state.graph[uuid]
            if (!parent_node.child_list) {
                parent_node.child_list = []
            }
            for (let ou in ous) {
                commit('updateNode', ous[ou])
                let existing = parent_node.child_list.findIndex(function(c) {
                    return c === ous[ou].uuid
                })
                if (existing < 0) {
                    parent_node.child_list.push(ous[ou].uuid)
                }
            }
            parent_node.child_count = parent_node.child_list.length
            commit('updateNode', parent_node)
        })
    },
    fetchOrgUnitAddresses: ({commit, state}, uuid) => {
        ajax(`/service/ou/${ uuid }/details/address`)
        .then((addresses) => {
            let new_node = state.graph[uuid]
            new_node.address_data = addresses
            commit('updateNode', new_node)
        })
    },
    initGraph: ({dispatch}, uuid) => {
        dispatch('fetchTree', uuid)
        .then(() => {
            dispatch('fetchOrgUnitChildren', uuid)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}