import React from 'react'
import { func, object, string } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import CloseIcon from 'mdi-react/CloseIcon'

const styles = {
  root: {
    position: 'relative',
  },
  overlay: {
    cursor: 'pointer',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    display: 'flex',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(245,247,250,0.5)',
    '&:hover': {
      opacity: 1,
    },
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

    zIndex: 1,
  },
  overlayIcon: {
    color: 'white',
  },
  video: {
    width: 70,
    height: 70,
    borderRadius: 10,
    margin: 2,
  },
}

const PictureThumbnail = ({ classes, src, onClick }) =>
  <div className={classes.root}>
    <div className={classes.overlay}>
      <CloseIcon onClick={onClick} className={classes.overlayIcon} />
    </div>
    <Avatar
      src={src}
      className={classes.video}
    />
  </div>

PictureThumbnail.propTypes = {
  classes: object.isRequired,
  onClick: func.isRequired,
  src: string.isRequired,
}

export default withStyles(styles)(PictureThumbnail)
