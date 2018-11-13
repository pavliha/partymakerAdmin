import React from 'react'
import { func, object, string } from 'prop-types'
import { withStyles, Button } from '@material-ui/core'
import CloseIcon from 'mdi-react/CloseIcon'

const styles = {
  root: {
    position: 'relative',
    padding: 10,
  },
  overlay: {
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 1,
  },
  overlayIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 36,
    height: 36,
    color: 'white',
  },
  video: {
    borderRadius: 10,
    margin: 2,
  },
}

const YoutubeThumbnal = ({ classes, youtube_id, onClick }) =>
  <div className={classes.root}>
    <Button variant="fab" color="primary" onClick={onClick} className={classes.overlayIcon}>
      <CloseIcon />
    </Button>
    <iframe
      title={youtube_id}
      src={`https://www.youtube.com/embed/${youtube_id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>

YoutubeThumbnal.propTypes = {
  classes: object.isRequired,
  youtube_id: string.isRequired,
  onClick: func.isRequired,
}

export default withStyles(styles)(YoutubeThumbnal)
