import { createRouter, createWebHistory } from 'vue-router';


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