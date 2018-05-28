import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/types'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../components/HelloWorld'),
  },
  {
    path: '/publicVotes',
    name: 'publicVotes',
    component: () => import('../../src/components/page/PublicVotes.vue'),
  },
  {
    path: '/blindVotes',
    name: 'blindVotes',
    component: () => import('../../src/components/page/BlindVotes.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/page/Login'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next({name: 'index'})
      } else {
        next()
      }
    },  // 登录状态下跳转到首页
  },
  {
    path: '/encrypt',
    name: 'encypt',
    component: () => import('@/components/page/Encrypt'),
  },
  {
    path: '/encryptVote',
    name: 'encryptVote',
    component: () => import('@/components/page/EncryptVote'),
  },
  {
    path: '/createVote',
    name: 'createVote',
    component: () => import('@/components/page/CreateVote'),
  },
  {
    path: '/voteBoard',
    name: 'voteBoard',
    component: () => import('@/components/page/voteBoard'),
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: () => import('@/components/page/UserManage'),
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
