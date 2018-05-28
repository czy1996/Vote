import instance from './http'
import {USER} from './url'

class User {
  getAll () {
    return new Promise((resolve, reject) => {
      instance.get(USER.GET_USER_ALL).then(
        ({data}) => {
          resolve(data)
        },
        err => reject(err),
      )
    })
  }
}

export default new User()
