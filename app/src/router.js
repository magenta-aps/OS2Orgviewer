import Vue from "vue"
import Router from "vue-router"

import Search from "./components/search/Search.vue"
import Tree from "./components/tree/Tree.vue"
import Organisation from "./components/organisation/Organisation.vue"
import Person from "./components/person/Person.vue"
import SomethingWrong from "./components/error/SomethingWrong.vue"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: {
        path: `/tree/${OC_GLOBAL_CONF.VUE_APP_ROOT_UUID}/${OC_GLOBAL_CONF.VUE_APP_ROOT_UUID}`,
      },
    },
    {
      path: "/tree/:orgUnitId/:rootOrgUnitId?",
      name: "tree",
      components: {
        tree: Tree,
      },
    },
    {
      path: "/orgunit/:orgUnitId/:rootOrgUnitId?",
      name: "orgunit",
      components: {
        tree: Tree,
        organisation: Organisation,
      },
    },
    {
      path: "/person/:personId/:orgUnitId?/:rootOrgUnitId?",
      name: "person",
      components: {
        tree: Tree,
        organisation: Organisation,
        person: Person,
      },
    },
    {
      path: "/search",
      name: "search",
      components: {
        search: Search,
      },
    },
    {
      path: "/error",
      name: "404",
      components: {
        error: SomethingWrong,
      },
    },
    {
      path: "*",
      redirect: "/error",
    },
  ],
})

export default router
