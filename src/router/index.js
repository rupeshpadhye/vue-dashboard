import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from '@/components/LoginForm';
import ErrorPage from '@/ErrorPage';


const About = () => import('@/components/About');
const UserManagement = () => import('@/components/user_management/UserManagement');
const Dashboard = () => import('@/components/Dashboard');
const HomeDashboard = () => import('@/components/HomeDashboard');
const ForgotPassWord = () => import('@/components/ForgotPassword');
const FlowChartApp = () => import('@/components/FlowChartApp');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
      meta: {
        permission: 'public',
        fail: '/error',
      },
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
          meta: {
            permission: 'admin|user',
            fail: '/error',
          },
        },
        {
          path: 'usermngment',
          component: UserManagement,
          meta: {
            permission: 'admin',
            fail: '/error',
          },
        },
        {
          path: '/about',
          component: About,
          meta: {
            permission: 'public',
            fail: '/error',
          },
        },
      ],
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage,
      meta: {
        permission: 'public',
      },
    },
    {
      path: '/reset',
      name: 'reset',
      component: ForgotPassWord,
      meta: {
        permission: 'public',
      },
    },
    {
      path: '/flowchart',
      name: 'FlowChartBoard',
      component: FlowChartApp,
      meta: {
        permission: 'public',
        fail: '/error',
      },
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
