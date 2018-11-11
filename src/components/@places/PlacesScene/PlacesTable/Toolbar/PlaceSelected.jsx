import React from 'react'
import { number, object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import DeletePlaceSelected from './DeletePlaceSelected'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 5,
  },
  counterText: {
    fontWeight: 600,
  },
}

const PlaceSelected = ({ classes, selected }) =>
  <div className={classes.root}>
    {selected > 0 ? (
      <div className={classes.root}>
        <DeletePlaceSelected />
        <Typography
          className={classes.counterText}
          component="div"
          color="primary"
          variant="subheading"
        >
          <span>{selected} places selected</span>
        </Typography>

      </div>
    ) : null}
  </div>

PlaceSelected.propTypes = {
  classes: object.isRequired,
  selected: number.isRequired,
}

export default withStyles(styles)(PlaceSelected)
