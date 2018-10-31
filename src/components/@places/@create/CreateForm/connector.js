import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import places from 'src/redux/places/action'
import place from 'src/redux/places/place/create/action'


const initMapStateToProps = store => ({
  form: store.createPlaceReducer.form,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    places: bindActionCreators(places, dispatch),
    place: bindActionCreators(place, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
