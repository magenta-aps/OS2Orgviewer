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
        let root_node = state.orgs[parent_uuid]
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
    orgs: {},
    current_org: null
}

const getters = {
    getGraph: state => {
        return state.orgs
    }, 
    getOrgUnit: (state) => (org_unit_uuid) => {
        return state.orgs[org_unit_uuid]
    },
    getCurrentOrgUnitUuid: (state) => {
        return state.current_org
    },
    getCurrentOrgUnit: (state) => {
        return state.orgs[state.current_org] ? state.orgs[state.current_org] : false
    },
    getChildren: (state) => (org_unit_uuid) => {
        let nodes = []
        for (let c in state.orgs[org_unit_uuid].child_list) {
            nodes.push(state.orgs[state.orgs[org_unit_uuid].child_list[c]])
        }
        return nodes
    }
}
const mutations = {
    updateNode: (state, node_data) => {
        if (!state.orgs[node_data.uuid]) {
            Vue.set(state.orgs, node_data.uuid, node_data)
        } else {
            let new_node = Object.assign({}, node_data, state.orgs[node_data.uuid])
            Vue.set(state.orgs, node_data.uuid, new_node)
        }
    },
    setOrgUnitPeople: (state, payload) => {
        let new_org = Object.assign({}, state.orgs[payload.org_uuid])
        new_org.person_data = payload.persons
        Vue.set(state.orgs, payload.org_uuid, new_org)
    },
    setCurrentOrgUnitUuid: (state, org_uuid) => {
        state.current_org = org_uuid
    }
}
const actions = {
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
        if (!state.orgs[uuid].child_list) {
            dispatch('fetchOrgUnitChildren', uuid)
            .then(children => {
                utils.mapChildrenToParent(uuid, children)
            })
        }
    },
    getAddresses: ({state, dispatch, commit}, uuid) => {
        if (!state.orgs[uuid] || !state.orgs[uuid].address_data) {
            dispatch('fetchOrgUnitAddresses', uuid)
            .then(addresses => {
                let new_node = state.orgs[uuid]
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