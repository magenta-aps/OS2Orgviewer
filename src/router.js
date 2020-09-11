import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/orgchart'
        },
        {
            path: '/orgchart',
            name: 'orgchart',
            
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.query.root) {
        store.commit('setRootOrgUnitUuid', to.query.root)
    }
    if (to.query.org) {
        store.commit('setActiveOrgUuid', to.query.org)
    }
    if (to.query.orgopen) {
        if (to.query.orgopen === 'open') {
            store.commit('setActiveOrgVisibility', true)
        } else {
            store.commit('setActiveOrgVisibility', false)
        }
    }
    if (to.query.person) {
        store.commit('setActivePersonUuid', to.query.person)
    }
    next()
})


export default router
