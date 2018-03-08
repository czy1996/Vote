import instance from './http'
import store from '../store/store'
import * as types from '../store/types'
import {AUTH} from './url'

class Login {
  login (data) {
    return new Promise((resolve, reject) => {
      instance.post(AUTH.LOGIN, data).then(
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
      instance.get(AUTH.LOGOUT).then(
        ({data}) => {
          store.commit(types.LOGOUT)
          resolve(data)
        },
        err => reject(err),
      )
    })
  }

  register (data) {
    return new Promise((resolve, reject) => {
      instance.post(AUTH.REGISTER, data).then(
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

  isUniqueName (username) {
    return new Promise((resolve, reject) => {
      instance.get(AUTH.CHECK_NAME + `?username=${username}`).then(
        ({data}) => {
          resolve(data.isUnique)
        }
      )
    })
  }
}

export default new Login()
