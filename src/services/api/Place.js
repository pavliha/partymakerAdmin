/* eslint-disable class-methods-use-this,no-return-await */
import Http from 'services/Http'
import qs from 'querystring'

class Place {
  find(id) {
    return Http.get(`/places/${id}`)
  }

  create(form) {
    return Http.post('/places', form)
  }

  update(id, form) {
    return Http.put(`/places/${id}`, form)
  }

  delete(id) {
    return Http.delete(`/places/${id}`)
  }

  all(params) {
    return Http.get(`/places?${qs.stringify({ limit: 10000, ...params })}`)
  }
}

export default new Place()
