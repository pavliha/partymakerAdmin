import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import place from 'src/redux/places/place/actions/action'
import places from 'src/redux/places/action'

const initMapStateToProps = store => ({
  selected: store.placesReducer.selected,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    place: bindActionCreators(place, dispatch),
    places: bindActionCreators(places, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
