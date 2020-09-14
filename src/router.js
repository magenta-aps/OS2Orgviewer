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
    if (to.query.orgopen && to.query.org) {
        if (to.query.orgopen === 'open') {
            store.commit('setActiveOrgVisibility', true) 
            setTimeout(function() {
                document.getElementById('orgtitle').focus()
            }, 300)
        } else {
            store.commit('setActiveOrgVisibility', false)
            setTimeout(function() {
                document.getElementById(`orgunit-${ to.query.org }`).focus()
            }, 300)
        }
    }
    if (to.query.person) {
        store.commit('setActivePersonUuid', to.query.person)
        setTimeout(function() {
            document.getElementById('persontitle').focus()
        }, 300)
    }
    next()
})

export default router