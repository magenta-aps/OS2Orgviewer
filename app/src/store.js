import Vue from 'vue'
import Vuex from 'vuex'

import person from './components/person/person-store.js'
import organisation from './components/organisation/organisation-store.js'
import tree from './components/tree/tree-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        person,
        organisation,
        tree
    }, 
    state: {
        loading: false,
        access_token: undefined,
        global_api_url: OC_GLOBAL_CONF.VUE_APP_API_BASEURL,
        keycloak_client_secret: OC_GLOBAL_CONF.KEYCLOAK_CLIENT_SECRET,
        relation_type: OC_GLOBAL_CONF.VUE_APP_ORG_PERSON_RELATION ? OC_GLOBAL_CONF.VUE_APP_ORG_PERSON_RELATION : 'engagement',
        global_root_uuid: OC_GLOBAL_CONF.VUE_APP_ROOT_UUID ? OC_GLOBAL_CONF.VUE_APP_ROOT_UUID : false,
        org_unit_hierarchy_uuids: OC_GLOBAL_CONF.VUE_ORG_UNIT_HIERARCHY_UUIDS
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
        },
        getOrgUnitHierarchyUuid: state => {
            return state.org_unit_hierarchy_uuids
        }
    },
    mutations: {
        setLoading: (state, bool) => {
            state.loading = bool
        },
        setAccessToken: (state, token) => {
            state.access_token = token
        }
    }
})
