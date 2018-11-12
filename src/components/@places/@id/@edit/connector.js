import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import header from 'src/redux/header/action'
import places from 'src/redux/places/action'
import place from 'src/redux/places/place/action'

const initMapStateToProps = store => ({
  places: store.placesReducer,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    header: bindActionCreators(header, dispatch),
    places: bindActionCreators(places, dispatch),
    place: bindActionCreators(place, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
