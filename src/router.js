import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/orgchart',
            name: 'orgchart'
        }
    ]
})

router.beforeEach((to, from, next) => {

    store.commit('setRootOrgUuid', to.query.root)
    store.commit('setActiveOrgUuid', to.query.org)
    store.commit('setActivePersonUuid', to.query.person)
    store.commit('setDisplayChildren', to.query.showchildren)
    store.commit('setActiveOrgVisibility', to.query.orgopen)

    store.dispatch('updateState')
    next()
})

export default router