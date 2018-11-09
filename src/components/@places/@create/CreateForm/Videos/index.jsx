import React from 'react'
import { array, object } from 'prop-types'
import { TextField, withStyles } from '@material-ui/core'
import formik from '../formik'

const styles = {
  root: {},
}

const url = 'https://www.youtube.com/watch?v='

const Videos = ({ classes, videos }) =>
  videos.map(video =>
    <TextField
      key={video}
      fullWidth
      label="Видео"
      name="video"
      defaultValue={`${url}${video}`}
      placeholder="https://www.youtube.com/"
      margin="dense"
      style={{ margin: 6 }}
      InputLabelProps={{ shrink: true }}
    />)

Videos.propTypes = {
  classes: object.isRequired,
  videos: array.isRequired,
}

export default withStyles(styles)(formik(Videos))
