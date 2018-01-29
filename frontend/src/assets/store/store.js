import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {},
    sessionId: null,
    title: '',
    isLogin: false,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.sessionId = data
      state.sessionId = data
      state.isLogin = true
    },
    [types.LOGOUT]: state => {
      localStorage.removeItem('sessionId')
      state.sessionId = null
      state.isLogin = false
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    }
  }
})
