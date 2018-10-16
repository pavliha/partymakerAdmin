import React from 'react'
import { number, object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

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

const PeopleSelected = ({ classes, selected }) =>
  <div className={classes.root}>
    {selected > 0 ? (
      <div>
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

PeopleSelected.propTypes = {
  classes: object.isRequired,
  selected: number.isRequired,
}

export default withStyles(styles)(PeopleSelected)
