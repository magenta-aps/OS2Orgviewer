import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import Search from './components/search/Search.vue'
import Tree from './components/tree/Tree.vue'
import Organisation from './components/organisation/Organisation.vue'
import Person from './components/person/Person.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'orgchart',
                query: {
                    root: store.state.organisation.root_org_uuid,
                    org: store.state.organisation.root_org_uuid,
                    showchildren: 1
                }
            }
        },
        {
            path: '/orgchart',
            name: 'orgchart',
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
        }
    ]
})

export default router