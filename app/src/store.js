import Vue from 'vue'
import Vuex from 'vuex'

import person from './components/person/person-store.js'
import manager from './components/manager/manager-store.js'
import organisation from './components/organisation/organisation-store.js'
import tree from './components/tree/tree-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        person,
        manager,
        organisation,
        tree
    }, 
    state: {
        loading: false,
        relation_type: OC_GLOBAL_CONF.VUE_APP_ORG_PERSON_RELATION ? OC_GLOBAL_CONF.VUE_APP_ORG_PERSON_RELATION : 'engagement',
        global_root_uuid: OC_GLOBAL_CONF.VUE_APP_ROOT_UUID ? OC_GLOBAL_CONF.VUE_APP_ROOT_UUID : false
    },
    getters: {
        isLoading: state => {
            return state.loading
        },
        getPersonRelation: state => {
            return state.relation_type
        },
        getGlobalRootUuid: state => {
            return state.global_root_uuid
        }
    },
    mutations: {
        setLoading: (state, bool) => {
            state.loading = bool
        }
    }
})