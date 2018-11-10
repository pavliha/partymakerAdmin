import React from 'react'
import { array, object } from 'prop-types'
import { IconButton, TextField, withStyles } from '@material-ui/core'
import DeleteIcon from 'mdi-react/DeleteIcon'
import formik from '../formik'
import connector from '../connector'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    color: theme.palette.secondary.dark,
    alignSelf: 'center',
  },
})

const url = 'https://www.youtube.com/watch?v='

class Videos extends React.Component {
  handleDelete = (video) => {
    const { actions } = this.props

    const videos = this.props.videos.filter(v => v !== video)

    actions.place.update({ videos })
  }

  render() {
    const { classes, videos } = this.props
    return videos.map(video =>
      <div className={classes.root}>
        <TextField
          fullWidth
          key={video}
          name="video"
          label="Видео"
          margin="dense"
          style={{ margin: 6 }}
          defaultValue={`${url}${video}`}
          InputLabelProps={{ shrink: true }}
          placeholder="https://www.youtube.com/"
        />
        <IconButton className={classes.icon} onClick={() => this.handleDelete(video)}>
          <DeleteIcon className={classes.icon} />
        </IconButton>
      </div>)
  }
}

Videos.propTypes = {
  actions: object.isRequired,
  classes: object.isRequired,
  videos: array,
}

Videos.defaultProps = {
  videos: [],
}

export default withStyles(styles)(connector(formik(Videos)))
