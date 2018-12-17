import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import labels from 'src/redux/labels/action'

const initMapStateToProps = store => ({
  labels: store.labelsReducer,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    labels: bindActionCreators(labels, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
