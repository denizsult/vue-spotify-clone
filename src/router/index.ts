import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import queryString from "query-string";
import store from '../store';

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
    ],

});

router.beforeEach(async (to, from, next) => {


    const params = new URLSearchParams(window.location.search);
    let requestCode = params.get("code");
    let key = "86b1f2359e5c444f8366bc09e96232ab";
    let scrt = "fc0dae6751a74a84bd8163dd1dfa52bd";
    if (requestCode) {
        await axios
            .post(
                "https://accounts.spotify.com/api/token",
                queryString.stringify({
                    grant_type: "authorization_code",
                    code: requestCode,
                    redirect_uri: "http://localhost:3000/",
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
                store.commit('setCode', response.data.access_token)
            })
    }

    console.log('x');
    let code = localStorage.getItem('code');

    if (to.matched.some(record => record.meta.isPublic)) {
        if (code) {
            next({
                path: '/'
            });
        } else {
            next();
        }
    } else {
        if (code) {
            next();
        } else {
            next({
                path: '/login'
            });
        }
    }
});




export default router;