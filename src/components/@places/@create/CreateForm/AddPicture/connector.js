import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import place from 'src/redux/places/place/actions/action'

const initMapStateToProps = store => ({
  current: store.placesReducer.current,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    place: bindActionCreators(place, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
