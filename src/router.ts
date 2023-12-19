import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/pages/NotFound.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import { useUserInfoStore } from '@/store/userInfo'
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
    meta: { isPublic: true}
  },
  { path: '/:path(.*)', component: NotFound, meta: { isPublic: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  if (!sessionStorage.getItem('initial')){
    sessionStorage.setItem('initial', 'true')
    interface meData {
      username: string
    }
    const res = await fetch('/api/me')
    if (res.ok) {
      res.json().then((data) => {
        const me = data as meData
        const userInfoStore = useUserInfoStore()
        userInfoStore.setUserName(me.username)
      })
      return true
    }
  }
  const userInfoStore = useUserInfoStore()
  if (userInfoStore.getNameFromSession() != '') {
    return true
  }
  if (to.meta.isPublic) {
    return true
  }
  return '/login'
})

export default router