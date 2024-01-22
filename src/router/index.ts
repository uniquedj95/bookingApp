import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import useAuth from "../composables/useAuth";

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    redirect: "/home"
  },
  {
    path: '/home', 
    component: () => import("../views/Home.vue"),
  },
  { 
    path: '/login', 
    component: () => import("../views/Login.vue"),
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

const { isAuthenticated } = useAuth();

router.beforeEach((to, from, next) => {
  if(!isAuthenticated.value && !/login/.test(to.path)) {
    return next("/login");
  }
  return next();
})

export default router;