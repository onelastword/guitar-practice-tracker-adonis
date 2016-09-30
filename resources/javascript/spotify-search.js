import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './search-spotify/app.vue';
import Search from './search-spotify/search.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  hashbang: false,
  history: true,
  linkActiveClass: 'active',
});

router.map({
  '/songs/search-spotify': {
    name: 'search-spotify',
    component: Search,
  },
});

if (document.querySelector('#vue-app')) {
  // Now we can start the app!
  // The router will create an instance of App and mount to
  // the element matching the selector #app.
  router.start(App, '#vue-app');
}
