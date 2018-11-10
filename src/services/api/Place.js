/* eslint-disable class-methods-use-this,no-return-await */
import Http from 'services/Http'
import qs from 'querystring'
import formatPlace from 'formatters/place'

class Place {
  async find(id) {
    const response = await Http.get(`/places/${id}`)
    return formatPlace(response)
  }

  async create(form) {
    const response = await Http.post('/places', form)
    return formatPlace(response)
  }

  async update(id, form) {
    const response = await Http.put(`/places/${id}`, form)
    return formatPlace(response)
  }

  async delete(places) {
    await places.forEach(async place =>
      await Http.delete(`/places/${place.id}`))
  }

  async all(params) {
    const response = await Http.get(`/places?${qs.stringify({ limit: 10000, ...params })}`)
    response.data = response.data.map(place => formatPlace(place))
    return response
  }
}

export default new Place()
