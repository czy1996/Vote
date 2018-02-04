import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    sessionId: null,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.sessionId = data
      state.sessionId = data
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('sessionId')
      state.sessionId = null
    },
  },
})
