import Vue from 'vue'
import ajax from '../http/http.js'

const orgIterator = function(orgs, node_uuid) {
    let new_node = {
        id: node_uuid,
        height: 5,
        width: 10
    }
    if (orgs[node_uuid].child_list && orgs[node_uuid].showchildren !== false) {
        new_node.children = []
        for (let c in orgs[node_uuid].child_list) {
            new_node.children.push(orgIterator(orgs, orgs[node_uuid].child_list[c]))
        }
    }
    return new_node
}

const state = {
    root_org_uuid: OC_GLOBAL_CONF.VUE_APP_ROOT_UUID,
    global_organisations: null,
    tree_data: null
}

const getters = {
    getRootOrgUnitUuid: state => {
        return state.root_org_uuid
    },
    getOrganisations: state => {
        return state.global_organisations
    },
    getTreeData: state => {
        return state.tree_data
    }
}
const mutations = {
    setRootOrgUnitUuid: (state, uuid) => {
        state.root_org_uuid = uuid
    },
    setOrganisations: (state, orgs) => {
        state.global_organisations = orgs
    },
    setTree: (state, tree) => {
        let new_tree = Object.assign({}, tree)
        Vue.set(state, 'tree_data', new_tree)
    },
    renderTreeData: (state, payload) => {
        if (payload.orgs[payload.root_uuid]) {
            state.tree_data = orgIterator(payload.orgs, payload.root_uuid)
        }
    }
}
const actions = {
    fetchGlobalOrgs: ({}) => {
        return ajax('/service/o/')
        .then(orgs => {
            return orgs
        })
    },
    fetchTree: ({rootState}, org_unit_uuid) => {
        return ajax(`/service/ou/ancestor-tree?uuid=${ org_unit_uuid }&count=${ rootState.relation_type }`)
        .then(tree => {
            return tree
        })
    },
    updateTreeData: ({state, rootState, commit}) => {
        commit('renderTreeData', {orgs: rootState.organisation.orgs, root_uuid: state.root_org_uuid})
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}