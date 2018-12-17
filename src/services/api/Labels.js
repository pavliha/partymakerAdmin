/* eslint-disable class-methods-use-this,no-return-await */
import Http from 'services/Http'

class Labels {
  all() {
    return Http.get('/labels')
  }
}

export default new Labels()
