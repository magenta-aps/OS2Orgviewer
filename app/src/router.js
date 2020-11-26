import Vue from 'vue'
import Router from 'vue-router'

import store from './store.js'
import Search from './components/search/Search.vue'
import Tree from './components/tree/Tree.vue'
import Organisation from './components/organisation/Organisation.vue'
import Person from './components/person/Person.vue'
import SomethingWrong from './components/error/SomethingWrong.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: {
                path: `/tree/${ GLOBAL_API_ROOT_UUID }`
            }
        },
        {
            path: '/tree/:orgUnitId',
            name: 'tree',
            components: {
                tree: Tree,
                organisation: Organisation,
                person: Person
            }
        },
        {
            path: '/orgunit/:orgUnitId',
            name: 'orgunit',
            components: {
                tree: Tree,
                organisation: Organisation,
                person: Person
            }
        },
        {
            path: '/person/:personId/:orgUnitId?',
            name: 'person',
            components: {
                tree: Tree,
                organisation: Organisation,
                person: Person
            }
        },
        {
            path: '/search',
            name: 'search',
            components: {
                search: Search
            }
        },
        {
            path: '/error',
            name: '404',
            components: {
                error: SomethingWrong
            }
        },
        {
            path: '*',
            redirect: '/error'
        }
    ]
})

router.beforeEach((to, from, next) => {
    
    if (to.params.orgUnitId && to.params.orgUnitId !== from.params.orgUnitId) {
        store.commit('setCurrentOrgUnitUuid', to.params.orgUnitId)
        store.dispatch('fetchOrgUnit', to.params.orgUnitId)
    }

    if (to.params.personId && to.params.personId !== from.params.personId) {
        store.commit('setCurrentPersonUuid', to.params.personId)
        store.dispatch('fetchPerson', to.params.personId)
    }
    
    next()
})

export default router