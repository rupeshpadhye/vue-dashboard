import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';
import RegisterUser from '@/components/user_management/RegisterUser';
import ManageUsers from '@/components/user_management/ManageUsers';
import HomeDashboard from '@/components/HomeDashboard';

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
          path: 'register',
          component: RegisterUser,
        },
        {
          path: 'modify',
          component: ManageUsers,
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
