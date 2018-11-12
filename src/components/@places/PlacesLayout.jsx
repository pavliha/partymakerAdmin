import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import PlacesScene from './PlacesScene'
import CreateScene from './@create/CreateScene'
import PlaceScene from './@id/PlaceScene'
import EditScene from './@id/@edit/EditScene'

const styles = () => ({
  root: {
    height: '100%',
  },
})

const PlacesLayout = ({ classes }) =>
  <div className={classes.root}>
    <Switch>
      <Route exact path="/places" component={PlacesScene} />
      <Route exact path="/places/create" component={CreateScene} />
      <Route exact path="/places/:id/edit" component={EditScene} />
      <Route exact path="/places/:id" component={PlaceScene} />
    </Switch>
  </div>

PlacesLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PlacesLayout)
