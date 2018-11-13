import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import placesTable from 'src/redux/table/places/action'

const initMapStateToProps = store => ({
  places: store.placesReducer,
  placesTable: store.table.placesReducer,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    placesTable: bindActionCreators(placesTable, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
