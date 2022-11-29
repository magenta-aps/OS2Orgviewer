// Import SASS styles
import "./assets/default-theme.css"
import "./assets/tree-layouts/base.scss"
import "./assets/tree-layouts/horizontal.scss"

// Import JS
import Vue from "vue"
import App from "./App.vue"
import Store from "./store.js"
import Router from "./router.js"

// Conditional load of ie11-custom-properties
import getIECP from "./components/ie11/ie11.js"
getIECP()

Vue.config.productionTip = false

new Vue({
  store: Store,
  router: Router,
  render: function (h) {
    return h(App)
  },
}).$mount("#app")
