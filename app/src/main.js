// Import SASS styles
import './assets/tree-layouts/vertical.scss';
import './assets/tree-layouts/horizontal.scss';
import './assets/tree-layouts/hybrid.scss';

// Import JS
import Vue from 'vue'
import App from './App.vue'
import Store from './store.js'
import Router from './router.js'

Vue.config.productionTip = false

new Vue({
  store: Store,
  router: Router,
  render: function (h) { return h(App) }
}).$mount('#app')
