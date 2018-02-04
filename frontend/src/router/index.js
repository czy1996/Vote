import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '../store/store'
import * as types from '../store/types'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/page/Login'),
  },
]

if (window.localStorage.getItem('sessionId')) {
  store.commit(types.LOGIN, window.localStorage.getItem('sessionId'))
}

const router = new Router({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath},
      })
    }
  } else {
    next()
  }
})

export default router
