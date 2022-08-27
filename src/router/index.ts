import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';

const getMe = (token) => {
    axios('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(res => {
        console.log(res.data);
    }
    ).catch(err => {
        console.log('error');
    });

}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue'),
            meta: {
                isPublic: true
            }
        },
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home.vue'),
            meta: {
                isPublic: false
            }
        }
    ],

});

router.beforeEach((to, from, next) => {
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