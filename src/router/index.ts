import { createRouter, createWebHistory } from 'vue-router';
 

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

 




export default router;