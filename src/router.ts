import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import NotFound from './pages/NotFound.vue'
import PingPage from './pages/PingPage.vue'
import LoginPage from './pages/LoginPage.vue'
import SignupPage from './pages/SignupPage.vue'
import CityPage from './pages/CityPage.vue'
import CalendarPage from './pages/CalendarPage.vue'

const routes = [
  { path: '/', name: 'home', component: LoginPage, meta: { isPublic: true } },
  { path: '/calendar', name: 'calendar', component: CalendarPage },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage,
    meta: { isPublic: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { isPublic: true }
  },
  { path: '/:path(.*)', component: NotFound, meta: { isPublic: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  if (to.meta.isPublic) {
    return true
  }
  const res = await fetch('/api/me')
  if (res.ok) return true
  return '/login'
})

export default router