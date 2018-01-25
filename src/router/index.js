import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from '@/components/LoginForm';

const About = () => import('@/components/About');
const UserManagement = () => import('@/components/user_management/UserManagement');
const Dashboard = () => import('@/components/Dashboard');
const HomeDashboard = () => import('@/components/HomeDashboard');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          component: HomeDashboard,
        },
        {
          path: 'usermngment',
          component: UserManagement,
        },
        {
          path: '/about',
          component: About,
        },
      ],
    },
  ],
});
/* TODO use store instead of localStorage */
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') && to.fullPath === '/login') {
    next('/');
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next('login');
    }
  } else {
    next();
  }
});

export default router;
