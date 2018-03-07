import {RSA} from './url'
import instance from './http'

class Rsa {
  sign (message) {
    return new Promise((resolve, reject) => {
      instance.post(RSA.SIGN,
        {
          message: message,
        }).then(
        ({data}) => resolve(data),

        err => reject(err),
      )
    })
  }
}

export default new Rsa()
