import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '@/router'

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Session = `{store.state.token`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default axios
