import instance from './http'
import {VOTE} from './url'

class Vote {
  cleanData (data) {
    let result = {}
    result.title = data.title
    result.id = data.Id
    result.options = []
    for (let o of data.options) {
      result.options.push({
        title: o.title,
        id: o.Id,
        value: o.value,
        description: o.description || '暂无',
      })
    }
    return result
  }

  getPublic (id) {
    return new Promise((resolve, reject) => {
      instance.get(VOTE.GET_PUBLIC + id.toString()).then(
        ({data}) => {
          resolve(this.cleanData(data))
        },

        err => reject(err),
      )
    })
  }

  getBlindAll () {
    return new Promise((resolve, reject) => {
      instance.get(VOTE.GET_PRIVATE_ALL).then(
        ({data}) => {
          resolve(data)
        },
        err => reject(err),
      )
    })
  }

  getBlind (id) {
    return new Promise((resolve, reject) => {
      instance.get(VOTE.GET_PRIVATE + id.toString()).then(
        ({data}) => {
          resolve(this.cleanData(data))
        },

        err => reject(err),
      )
    })
  }

  getPublicAll () {
    return new Promise((resolve, reject) => {
      instance.get(VOTE.GET_PUBLIC_ALL).then(
        ({data}) => {
          resolve(data)
        },

        err => reject(err),
      )
    })
  }

  optionInc (voteId, obj) {
    let url = VOTE.PATCH_PUBLIC + voteId.toString()

    return new Promise((resolve, reject) => {
      instance.patch(
        url,
        obj,
      ).then(
        ({data}) => resolve(this.cleanData(data)),
        err => reject(err),
      )
    })
  }

  postPrivate (obj) {
    return new Promise((resolve, reject) => {
      instance.post(VOTE.POST_PRIVATE, obj).then(
        ({data}) => {
          resolve(data)
        },
        err => reject(err),
      )
    })
  }

  postTicket (obj) {
    console.log('post ticket', obj)
    return new Promise((resolve, reject) => {
      instance.post(VOTE.POST_PRIVATE_TICKET, obj).then(
        ({data}) => {
          resolve(data)
        },
        err => reject(err),
      )
    })
  }

  getPrivate (id) {
    return new Promise((resolve, reject) => {
      instance.get(VOTE.GET_PRIVATE + id.toString()).then(
        ({data}) => {
          resolve(this.cleanData(data))
        },

        err => reject(err),
      )
    })
  }

  getRecordsAll (id) {
    let url = VOTE.GET_PRIVATE + id.toString() + '/record/all'
    return new Promise((resolve, reject) => {
      instance.get(url).then(
        ({data}) => {
          resolve(data)
        },
        err => reject(err),
      )
    })
  }
}

export default new Vote()
