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
        mutations.addNode(state, branch[n])
    }
}

const state = {
    graph: {},
    active_org_uuid: null,
    active_org_display_children: 0,
    active_org_visible: 0,
    root_org_uuid: null,
    global_organisations: null
}

const getters = {
    getGraph: state => {
        return state.graph
    }, 
    getNode: (state) => (org_unit_uuid) => {
        return state.graph[org_unit_uuid]
    },
    getChildren: (state) => (org_unit_uuid) => {
        let nodes = []
        for (let c in state.graph[org_unit_uuid].child_list) {
            nodes.push(state.graph[state.graph[org_unit_uuid].child_list[c]])
        }
        return nodes
    },
    getActiveOrgUuid: state => {
        return state.active_org_uuid
    },
    getDisplayChildren: state => {
        if (state.active_org_uuid && state.active_org_display_children == 1) {
            return true
        } else {
            return false
        }
    },
    getActiveOrgVisibility: state => {
        if (state.active_org_uuid && state.active_org_visible == 1) {
            return true
        } else {
            return false
        }
    },
    getRootOrgUnitUuid: state => {
        return state.root_org_uuid
    },
    getOrganisations: state => {
        return state.global_organisations
    }
}
const mutations = {
    addNode: (state, node) => {
        Vue.set(state.graph, node.uuid, node)
    },
    setActiveOrgUuid: (state, uuid) => {
        state.active_org_uuid = uuid
    },
    setDisplayChildren: (state, display_1_0) => {
        state.active_org_display_children = display_1_0
    },
    setActiveOrgVisibility: (state, open_1_0) => {
        state.active_org_visible = open_1_0
    },
    setRootOrgUuid: (state, uuid) => {
        state.root_org_uuid = uuid
    },
    setOrganisations: (state, orgs) => {
        state.global_organisations = orgs
    },
    updateRelations: (state) => {
        for (let o in state.graph) {
            if (state.graph[o].children) {
                let child_list = []
                if (state.graph[o].child_list) {
                    child_list = state.graph[o].child_list
                }
                for (let c in state.graph[o].children) {
                    let child = state.graph[o].children[c]
                    let existing_child = state.graph[o].child_list.findIndex(function(c) {
                        return c === child.uuid
                    })
                    if (existing_child < 0) {
                        child_list.push(child.uuid)
                    }
                    Vue.set(state.graph[child.uuid], parent_uuid, state.graph[o].uuid)
                }
                Vue.set(state.graph[o], child_list, child_list)
            }
        }
        /*
        for (let o in state.graph) {
            for (let c in state.graph[o].child_list) {
                let child = state.graph[state.graph[o].child_list[c]]
                child.parent_uuid = state.graph[o].uuid
                Vue.set(state.graph, child.uuid, child)
            }
        }
        */
    }
}
const actions = {
    updateState: ({state, dispatch, commit}) => {

        // fetch ancestortree from active org or root in that order
        if (state.graph[state.active_org_uuid] && state.graph[state.root_org_uuid]) {
            dispatch('fetchOrgUnitChildren', state.active_org_uuid)
        } else  {
            let uuid = null
            if (state.active_org_uuid) {
                uuid = state.active_org_uuid
            } else if (state.root_org_uuid) {
                uuid = state.root_org_uuid
            }
            if (uuid) {
                dispatch('fetchTree', uuid)
                .then(tree => {
                    dispatch('fetchOrgUnitChildren', uuid)
                })
            }
        }  

        // update person info
        dispatch('updatePerson')
    },
    checkActiveOrgExpanded: ({dispatch}, payload) => {
        if (payload.showchildren == 1) {
            dispatch('fetchOrgUnitChildren', payload.org)
        }
    },
    checkOrgChildren: ({state, dispatch}, org_uuid) => {
        let org = state.graph[org_uuid]
        if (!org.child_list) {
            dispatch('fetchOrgUnitChildren', org_uuid)
        }
    },
    fetchGlobalOrgs: ({commit}) => {
        return ajax(`/service/o/`)
        .then(orgs => {
            commit('setOrganisations', orgs)
            // We assume there is only one organisation
            return ajax(`/service/o/${ orgs[0].uuid }/children`)
            .then(children => {
                for (let c in children) {
                    children[c].showchildren = false
                    commit('addNode', children[c])
                }
                return children
            })
        })
    },
    fetchTree: ({}, org_unit_uuid) => {
        return ajax(`/service/ou/ancestor-tree?uuid=${ org_unit_uuid }`)
        .then(tree => {
            mapTreeToGraph(tree, org_unit_uuid)
            return tree
        })
    },
    fetchOrgUnit: ({commit, dispatch}, uuid) => {
        ajax(`/service/ou/${ uuid }/`)
        .then((org_unit) => {
            dispatch('fetchOrgUnitChildren', uuid)
            commit('addNode', org_unit)
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
                commit('addNode', ous[ou])
                let existing = parent_node.child_list.findIndex(function(c) {
                    return c === ous[ou].uuid
                })
                if (existing < 0) {
                    parent_node.child_list.push(ous[ou].uuid)
                }
            }
            commit('addNode', parent_node)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}