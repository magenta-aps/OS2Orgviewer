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
    }
})