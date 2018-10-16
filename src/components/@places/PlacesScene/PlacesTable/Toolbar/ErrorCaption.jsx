import React from 'react'
import { node, object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 5,
  },
}

const ErrorCaption = ({ classes, children }) => {
  if (!children) return null
  return (
    <div className={classes.root}>
      <Typography
        variant="caption"
        color="error"
      >
        {children}
      </Typography>
    </div>
  )
}

ErrorCaption.propTypes = {
  classes: object.isRequired,
  children: node,
}
ErrorCaption.defaultProps = {
  children: null,
}

export default withStyles(styles)(ErrorCaption)
