// index.ts (router)
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue';
import Auth from '../pages/Auth.vue';
import Profile from '../pages/Profile.vue';
import Products from '../pages/Products.vue';
import ProductCreate from '../pages/ProductCreate.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import { useAuthStore } from '../stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true },
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: 'products/create',
        name: 'ProductCreate',
        component: ProductCreate,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Auth',
        component: Auth,
        meta: { guestOnly: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  
  // If auth is not ready yet, we shouldn't make any decisions
  if (!authStore.authReady) {
    // You could return a Promise here that resolves when auth is ready,
    // but it's better to handle this in App.vue by not rendering the router until auth is ready
    console.log('Auth not ready yet, waiting...');
    
    // Just proceed, App.vue will show loading screen until auth is ready
    return next();
  }
  
  console.log('Auth ready, checking route:', to.path);
  console.log('User authenticated:', authStore.isAuthenticated);
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Route requires auth but user is not logged in
    console.log('Route requires auth, redirecting to login');
    return next({ name: 'Auth' });
  } 
  
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    // Route is for guests only (like login page) but user is already logged in
    console.log('User already logged in, redirecting to home');
    return next({ name: 'Home' });
  }
  
  // Default case: allow navigation
  return next();
});

export default router;