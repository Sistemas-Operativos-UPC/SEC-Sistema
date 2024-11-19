import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "../iam/services/auth-store.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            name: 'clases',
            alias: ['/classes', '/home'],
            component: () => import('../learning/pages/clases.view.vue'),
        },
        {
            path: '/classes/:id',
            name: 'class',
            component: () => import('../learning/pages/clase.view.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../public/pages/login.view.vue')
        },
        {
            path: '/sign-up',
            name: 'register',
            component: () => import('../public/pages/sign-up.view.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    authStore.refresh();
    if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
        next({name: 'clases'});
    }
    else if (to.name !== 'login' && to.name !== 'register' && !authStore.isAuthenticated) {
        next({name: 'login'});
    }
    else {
        next();
    }
});

export default router;