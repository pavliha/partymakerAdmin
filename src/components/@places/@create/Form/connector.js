import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import places from 'src/redux/places/action'
import place from 'src/redux/places/place/actions/action'


const initMapStateToProps = store => ({
  form: store.actionsPlaceReducer.form,
  current: store.placesReducer.current,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    places: bindActionCreators(places, dispatch),
    place: bindActionCreators(place, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
