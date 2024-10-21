import { createRouter, createWebHistory } from 'vue-router';
import { useAuthUser } from '@/store/authenticate'; // Import the useAuthUser store

import Home from './views/HomePage.vue';
import Transaction from './views/TransactionPage';
import Payment from './views/PayMent.vue';

import LogIn from './views/auth/LogIn.vue';
import SignUp from './views/auth/SignUp.vue';
import ForgetPassword from './views/auth/ForgetPassword.vue';
import ResetCode from './views/auth/ResetCode.vue';
import ResetPassword from './views/auth/ResetPassword.vue';
import Profile from './views/auth/ProfilePage.vue';

import Airtime from './views/services/AirtimePage.vue';
import Data from './views/services/DataPage.vue';
import Cable from './views/services/CablePage.vue';
import Electricity from './views/services/ElectricityPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true } // Protected route, requires authentication
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment,
    meta: { requiresAuth: true } // Protected route, requires authentication
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: SignUp,
    meta: { requiresGuest: true }
  },
  {
    path: '/reset-code',
    name: 'reset-code',
    component: ResetCode,
    meta: { requiresAuth: true } // Protected route, requires authentication
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: ForgetPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true } // Protected route, requires authentication
  },
  {
    path: '/serivices',
    name: 'services',
    component: Home,
    meta: { requiresAuth: true } // Protected route, requires authentication
  },
  {
    path: '/:service',
    name: 'airtime',
    component: Airtime,
    meta: { requiresAuth: true }, // Protected route, requires authentication
    props: true,
  },
  {
    path: '/:service',
    name: 'data',
    component: Data,
    meta: { requiresAuth: true } // Protected route, requires authentication
  },
  {
    path: '/:service',
    name: 'tv-subscription',
    component: Cable,
    meta: { requiresAuth: true }, // Protected route, requires authentication
    props: true,
  },
  {
    path: '/electricity',
    name: 'electricity',
    component: Electricity,
    meta: { requiresAuth: true } // Protected route, requires authentication
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction,
    meta: { requiresAuth: true } // Protected route, requires authentication
  },
  // Add more routes as needed

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthUser(); // Initialize the useAuthUser store

  try {
    await authStore.fetchUserData(); // Fetch user data if available
    const isAuthenticated = !!authStore.userData;

    if (to.matched.some(record => record.meta.requiresAuth)) {
      // If the route requires authentication and the user is not authenticated
      if (!isAuthenticated) {
        next({
          path: '/login',
          query: { redirect: to.fullPath } // Save the intended route before redirecting to login
        });
      } else {
        next(); // Proceed to the requested route
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      // If the route should only be accessible to guests (not authenticated users)
      if (isAuthenticated) {
        next({ path: '/' }); // Redirect authenticated users to the home page or another protected route
      } else {
        next(); // Proceed to the requested route
      }
    } else {
      next(); // Proceed to the requested route
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    // If an error occurs while fetching user data, assume the user is not authenticated
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // Save the intended route before redirecting to login
      });
    } else {
      next(); // Proceed to the requested route
    }
  }
});


export default router;


