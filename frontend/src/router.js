import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import HomePage from './views/HomePage.vue';
import CategoryPage from './views/CategoryPage.vue';
import ProductPage from './views/ProductPage.vue';
import CartPage from './views/CartPage.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/home', name: 'Home', component: HomePage, meta: { requiresAuth: true } },
    { path: '/category', name: 'Category', component: CategoryPage, meta: { requiresAuth: true } },
    { path: '/product', name: 'Product', component: ProductPage, meta: { requiresAuth: true } },
    { path: '/cart', name: 'Cart', component: CartPage, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userData = localStorage.getItem('userData');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userData) {
            next({ path: '/login' });
        } else {
            const { token } = JSON.parse(userData);
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isExpired = payload.exp < Date.now() / 1000;

            if (isExpired) {
                localStorage.removeItem('userData');
                next({ path: '/login' });
            } else {
                next();
            }
        }
    } else {
        next();
    }
});


export default router;

