import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import places from 'src/redux/places/action'

const initMapStateToProps = store => ({
  places: store.placesReducer,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    places: bindActionCreators(places, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
