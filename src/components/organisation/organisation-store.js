import Vue from 'vue'
import ajax from '../http/http.js'

const state = {
    graph: {},
    active_org_uuid: null,
    active_org_visible: false
}

const getters = {
    getGraph: state => {
        return state.graph
    }, 
    getNode: (state) => (org_unit_uuid) => {
        return state.graph[org_unit_uuid]
    },
    getChildren: (state) => (org_unit_uuid) => {
        const children = state.graph[org_unit_uuid].children
        let nodes = []
        for (let child in children) {
            nodes.push(state.graph[children[child]])
        }
        return nodes
    },
    getActiveOrgUuid: state => {
        return state.active_org_uuid
    },
    getActiveOrgVisibility: state => {
        return state.active_org_visible
    }
}
const mutations = {
    addNode: (state, node) => {
        if (!state.graph[node.uuid]) {
            Vue.set(state.graph, node.uuid, node)
        }
    },
    addChild: (state, payload) => {
        let parent = state.graph[payload.parent_uuid]
        if (!parent.children) {
            parent.children = []
        }
        const existing_child = parent.children.findIndex(function(uuid) {
            return uuid === payload.child.uuid
        })
        if (existing_child < 0) {
            parent.children.push(payload.child.uuid)
        }
        payload.child.parent_uuid = payload.parent_uuid
    },
    setActiveOrgUuid: (state, uuid) => {
        state.active_org_uuid = uuid
    },
    setActiveOrgVisibility: (state, bool) => {
        state.active_org_visible = bool
    }
}
const actions = {
    fetchOrgUnitChildren: ({commit}, uuid) => {
        ajax(`/service/ou/${ uuid }/children`)
        .then((orgs) => {
            for (let org in orgs) {
                commit('addChild', {
                    parent_uuid: uuid,
                    child: orgs[org]
                })
                commit('addNode', orgs[org])
            }
        })
    },
    fetchOrgUnit: ({commit, dispatch}, uuid) => {
        ajax(`/service/ou/${ uuid }/`)
        .then((org_unit) => {
            dispatch('fetchOrgUnitChildren', uuid)
            commit('addNode', org_unit)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}