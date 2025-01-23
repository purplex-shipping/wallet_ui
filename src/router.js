import { createRouter, createWebHistory } from 'vue-router';
import { useAuthUser } from '@/store/authenticate'; // Import the useAuthUser store

import Home from './views/HomePage.vue';

import LogIn from './views/auth/LogIn.vue';
import SignUp from './views/auth/SignUp.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
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


