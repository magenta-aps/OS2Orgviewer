import Vue from 'vue'
import ajax from '../http/http.js'

const normalizeOrgUnit = function(org_unit) {
    let new_org_unit = org_unit
    // Check for existing org unit object
    if (state.graph[org_unit.uuid]) {
        new_org_unit = state.graph[org_unit.uuid]
    }
    // Update parent UUID if any
    if (org_unit.parent && !new_org_unit.parent_uuid) {
        new_org_unit.parent_uuid = org_unit.parent.uuid
    }
    // Update child_list if applicable
    if (org_unit.children && !new_org_unit.child_list) {
        new_org_unit.child_list = []
        for (let c in org_unit.children) {
            new_org_unit.child_list.push(org_unit.children[c].uuid)
        }
    }
    // Update child_count if not present
    if (!new_org_unit.child_count && !org_unit.child_count) {
        if (new_org_unit.children) {
            new_org_unit.child_count = new_org_unit.children.length
        }
    }
    return new_org_unit
}

const updateParent = function(parent_uuid, child_uuid) {
    let parent = state.graph[parent_uuid]
    if (!parent.child_list) {
        parent.child_list = [
            child_uuid
        ]
    } else {
        const existing_child = parent.child_list.findIndex(function(uuid) {
            return uuid === child_uuid
        })
        if (existing_child < 0) {
            parent.child_list.push(child_uuid)
        }
    }
    Vue.set(state.graph, parent_uuid, parent)
}

const state = {
    graph: {},
    active_org_uuid: null,
    active_org_visible: false,
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
        for (let n in state.graph[org_unit_uuid].child_list) {
            nodes.push(state.graph[state.graph[org_unit_uuid].child_list[n]])
        }
        return nodes
    },
    getActiveOrgUuid: state => {
        return state.active_org_uuid
    },
    getActiveOrgVisibility: state => {
        return state.active_org_visible
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
        Vue.set(state.graph, node.uuid, normalizeOrgUnit(node))
    },
    setActiveOrgUuid: (state, uuid) => {
        state.active_org_uuid = uuid
    },
    setActiveOrgVisibility: (state, bool) => {
        state.active_org_visible = bool
    },
    setRootOrgUuid: (state, uuid) => {
        state.root_org_uuid = uuid
    },
    setOrganisations: (state, orgs) => {
        state.global_organisations = orgs
    }
}
const actions = {
    checkRootorg: ({state, dispatch, commit}, root_org_uuid) => {
        if (!state.graph[root_org_uuid]) {
            dispatch('fetchGlobalOrgs')
            .then(orgs => { 
                for (let org in orgs) {
                    ajax(`/service/o/${ orgs[org].uuid }/children`)
                    .then((tree) => {
                        dispatch('mapTreeToGraph', tree)
                        // We only want to deal with one root. 
                        // Taking the first org unit child and passing it on
                        commit('setRootOrgUuid', tree[0].uuid)
                    })
                }
            })
        } else {
            commit('setRootOrgUuid', root_org_uuid)
        }
    },
    checkActiveOrg: ({state, dispatch, commit}, org_unit_uuid) => {
        if (!state.graph[org_unit_uuid]) {
            dispatch('fetchTree', org_unit_uuid)
            .then(tree => {
                dispatch('mapTreeToGraph', tree)
                commit('setActiveOrgUuid', org_unit_uuid)
                dispatch('fetchOrgUnitChildren', org_unit_uuid)
            })
        } else {
            commit('setActiveOrgUuid', org_unit_uuid)
        }
    },
    checkActiveOrgExpanded: ({dispatch}, payload) => {
        if (payload.expanded === 'expanded') {
            dispatch('fetchOrgUnitChildren', payload.org)
        }
    },
    checkOrgChildren: ({state, dispatch}, org_uuid) => {
        let org = state.graph[org_uuid]
        if (!org.child_list) {
            dispatch('fetchOrgUnitChildren', org_uuid)
        }
    },
    /*
    initTree: ({dispatch}, params) => {
        dispatch('fetchGlobalOrgs')
        .then(orgs => {
            if (params.root && params.org) {
                dispatch('initFromUrl', params)
            } else {
                dispatch('initFromNothing', orgs)
            }
        })
    },
    initFromNothing: ({dispatch, commit}, orgs) => {
        for (let org in orgs) {
            ajax(`/service/o/${ orgs[org].uuid }/children`)
            .then((tree) => {
                dispatch('mapTreeToGraph', tree)
                // We only want to deal with one root. 
                // Taking the first org unit child and passing it on
                commit('setRootOrgUuid', tree[0].uuid)
            })
        }
    },
    initFromUrl: ({dispatch, commit}, params) => {
        dispatch('fetchTree', params.org)
        .then(tree => {
            console.log(tree)
            dispatch('mapTreeToGraph', tree)
        })
    },
    */
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
    fetchOrgUnitChildren: ({commit}, uuid) => {
        ajax(`/service/ou/${ uuid }/children`)
        .then((ous) => {
            for (let ou in ous) {
                updateParent(uuid, ous[ou].uuid)
                ous[ou].parent_uuid = uuid
                commit('addNode', ous[ou])
            }
        })
    },
    mapTreeToGraph: ({commit, dispatch}, branch) => {
        for (let node in branch) {
            if (branch[node].children) {
                branch[node].expanded = true
                branch[node].child_count = branch[node].children.length
                dispatch('mapTreeToGraph', branch[node].children)
            } else {
                branch[node].expanded = false
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