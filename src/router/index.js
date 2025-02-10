import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/dashboardView.vue';
import LoginPage from '@/views/loginPage.vue';
import TicketForm from '@/views/TicketForm.vue';
import Settings from '@/views/Settings.vue';
import signup from '@/views/signUp.vue';

const isAuthenticated = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser ? true : false;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, hasSidebar: true },
    },

    {
      path: '/create-ticket',
      name: 'create-ticket',
      component: TicketForm,
      meta: { requiresAuth: true, hasSidebar: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresAuth: false, hasSidebar: false },
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next('/dashboard');
        } else {
          next();
        }
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
      meta: { requiresAuth: false, hasSidebar: false },
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next('/dashboard');
        } else {
          next();
        }
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { requiresAuth: true, hasSidebar: true },
    },
  ],

});

// Navigation Guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
