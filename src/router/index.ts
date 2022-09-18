import axios from 'axios';
import queryString from 'query-string'
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import spotify from '../utils/spotify';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue'),
            meta: {
                isPublic: true,
                layout: false
            }
        },
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home.vue'),
            meta: {
                isPublic: false,
                layout: true
            }
        },
        {
            path: '/playlist/:id?',
            name: 'playlist',
            component: () => import('../views/playlist.vue'),
            meta: {
                isPublic: false,
                layout: true

            }

        }
    ]

});
 
router.beforeEach(async (to, from, next) => {
    store.commit('setLayout', to.meta.layout)
    const params = new URLSearchParams(window.location.search);
    let requestCode = params.get("code");
    let key = "86b1f2359e5c444f8366bc09e96232ab";
    let scrt = "fc0dae6751a74a84bd8163dd1dfa52bd";
    if (requestCode && !localStorage.getItem("token") ) {
      await axios
        .post(
          "https://accounts.spotify.com/api/token",
          queryString.stringify({
            grant_type: "authorization_code",
            code: requestCode,
            redirect_uri:window.location.origin,
            client_id: key,
            client_secret: scrt,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(async (response) => {
          localStorage.setItem("token", response.data.access_token);
          spotify.setAccessToken(response.data.access_token);
        });
    }
  
    let token = localStorage.getItem("token");
    if (to.matched.some((record) => record.meta.isPublic)) {
      if (token) {
        next({
          path: "/",
        });
      } else {
        next();
      }
    } else {
      if (token) {
        next();
      } else {
        next({
          path: "/login",
        });
      }
    }
  });




export default router;