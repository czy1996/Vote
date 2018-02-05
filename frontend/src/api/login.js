import axios from './http'
import store from '../store/store'
import * as types from '../store/types'

const instance = axios.create({
  baseURL: '/api/auth',
})

class Login {
  constructor () {
    this.url_login = '/login'
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
}

export default new Login()
