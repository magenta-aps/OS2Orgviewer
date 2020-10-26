import Vue from 'vue'
import ajax from '../http/http.js'

const utils = {
    mapTreeToGraph: function(branch, parent_uuid) {
        for (let n in branch) {
            branch[n].parent_uuid = parent_uuid
            if (branch[n].children) {
                branch[n].showchildren = true
                branch[n].child_count = branch[n].children.length
                branch[n].child_list = []
                for (let c in branch[n].children) {
                    branch[n].child_list.push(branch[n].children[c].uuid)
                }
                utils.mapTreeToGraph(branch[n].children, branch[n].uuid)
            } else {
                branch[n].showchildren = false
            }
            mutations.updateNode(state, branch[n])
        }
    },
    mapChildrenToParent: function(parent_uuid, children) {
        let root_node = state.graph[parent_uuid]
        root_node.child_list = []
        for (let c in children) {
            children[c].parent_uuid = parent_uuid
            mutations.updateNode(state, children[c])
            root_node.child_list.push(children[c].uuid)
        }
        mutations.updateNode(state, root_node)
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
        } else {
            let new_node = Object.assign({}, node_data, state.graph[node_data.uuid])
            Vue.set(state.graph, node_data.uuid, new_node)
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
    },
    fetchOrgUnit: ({}, uuid) => {
        return ajax(`/service/ou/${ uuid }/`)
        .then(org_unit => {
            return org_unit
        })
    },
    fetchOrgUnitChildren: ({}, uuid) => {
        return ajax(`/service/ou/${ uuid }/children`)
        .then(ous => {
            return ous
        })
    },
    fetchOrgUnitAddresses: ({}, uuid) => {
        return ajax(`/service/ou/${ uuid }/details/address`)
        .then(addresses => {
            return addresses
        })
    },
    getTree: ({dispatch}, uuid) => {
        dispatch('fetchTree', uuid)
        .then(tree => {
            utils.mapTreeToGraph(tree, false)
            dispatch('fetchOrgUnitChildren', uuid)
            .then(children => {
                utils.mapChildrenToParent(uuid, children)
            })
        })
    },
    getChildren: ({state, dispatch}, uuid) => {
        if (!state.graph[uuid].child_list) {
            dispatch('fetchOrgUnitChildren', uuid)
            .then(children => {
                utils.mapChildrenToParent(uuid, children)
            })
        }
    },
    getAddresses: ({state, dispatch, commit}, uuid) => {
        if (!state.graph[uuid] || !state.graph[uuid].address_data) {
            dispatch('fetchOrgUnitAddresses', uuid)
            .then(addresses => {
                let new_node = state.graph[uuid]
                new_node.address_data = addresses
                commit('updateNode', new_node)
            })
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}