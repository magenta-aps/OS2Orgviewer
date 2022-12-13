import Vue from "vue"
import Vuex from "vuex"

import person from "./components/person/person-store.js"
import organisation from "./components/organisation/organisation-store.js"
import tree from "./components/tree/tree-store.js"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    person,
    organisation,
    tree,
  },
  state: {
    loading: false,
    access_token: undefined,
    global_api_url: process.env.VUE_APP_API_BASEURL,
    keycloak_client_secret: process.env.VUE_APP_MO_BASEURL,
    relation_type: process.env.VUE_APP_PERSON_RELATION
      ? process.env.VUE_APP_PERSON_RELATION
      : "engagement",
    global_root_uuid: process.env.VUE_APP_ROOT_UUID
      ? process.env.VUE_APP_ROOT_UUID
      : false,
    org_unit_hierarchy_uuids: process.env.VUE_ORG_UNIT_HIERARCHY_UUIDS,
  },
  getters: {
    isLoading: (state) => {
      return state.loading
    },
    getPersonRelation: (state) => {
      return state.relation_type
    },
    getGlobalRootUuid: (state) => {
      return state.global_root_uuid
    },
  },
  mutations: {
    setLoading: (state, bool) => {
      state.loading = bool
    },
    setAccessToken: (state, token) => {
      state.access_token = token
    },
  },
})
