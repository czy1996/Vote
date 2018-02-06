import instance from './http'
import store from '../store/store'
import * as types from '../store/types'

class Login {
  constructor () {
    this.url_login = 'auth/login'
    this.url_logout = 'auth/logout'
  }

  login (data) {
    return new Promise((resolve, reject) => {
      instance.post(this.url_login, data).then(
        ({data}) => {
          if (data.status === 'success') {
            store.commit(types.LOGIN, data.session_id)
          }
          resolve(data)
        },
        err => reject(err),
      )
    })
  }

  logout () {
    return new Promise((resolve, reject) => {
      instance.get(this.url_logout).then(
        ({data}) => {
          store.commit(types.LOGOUT)
          resolve(data)
        },
        err => reject(err),
      )
    })
  }
}

export default new Login()
