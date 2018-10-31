import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import place from 'src/redux/places/place/create/action'

const initMapStateToProps = store => ({})

const initMapDispatchToProps = dispatch => ({
  actions: {
    place: bindActionCreators(place, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
