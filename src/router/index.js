import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PreScreening from '../views/PreScreening.vue'
import NotFound from '../views/404Found.vue'
import Login from '../views/loginScreen.vue'
import Medical from '../views/medicalCertificate.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pre-screenings',
    name: 'preScreening',
    component: PreScreening
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/medical-certificate',
    name: 'medical',
    component: Medical
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
