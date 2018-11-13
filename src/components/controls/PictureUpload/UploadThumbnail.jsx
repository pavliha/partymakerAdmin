import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { SvgIcon, Avatar, CircularProgress } from '@material-ui/core'
import UploadIcon from 'mdi-react/UploadIcon'

const styles = () => ({
  root: {
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    width: 70,
    backgroundColor: '#e5e8eb',
    color: '#dde2eb',
    height: 70,
    border: '2px solid #bab8bd',
    borderRadius: 10,
    '&:hover': {
      backgroundColor: '#ebeaef',
    },
  },
  uploadIcon: {
    color: '#bab8bd',
  },
})

const UploadThumbnail = ({ classes, loadingPicture, progress, ...props }) =>
  <Avatar {...props} className={classes.root} src={loadingPicture}>
    {progress
      ? <CircularProgress variant="determinate" value={progress} />
      : <SvgIcon className={classes.uploadIcon}><UploadIcon /></SvgIcon>
    }
  </Avatar>

UploadThumbnail.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingPicture: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
}

export default withStyles(styles)(UploadThumbnail)
