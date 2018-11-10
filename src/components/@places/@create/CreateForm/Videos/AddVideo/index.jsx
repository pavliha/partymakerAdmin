import React from 'react'
import { array, object } from 'prop-types'
import { Button, TextField, withStyles } from '@material-ui/core'
import connector from '../../connector'

const styles = {
  root: {},
}

class AddVideo extends React.Component {
  state = {
    video: '',
  }

  handleAddVideo = () => {
    const { actions, videos } = this.props
    const { video } = this.state


    videos.push(video.split('=')[1].split('?')[0].split('&')[0])

    actions.place.update({ videos })

    this.setState({
      video: '',
    })
  }

  handleChange = event => {
    this.setState({
      video: event.target.value,
    })
  }

  render() {
    const { classes } = this.props
    const { video } = this.state

    return (
      <div className={classes.root}>
        <TextField
          fullWidth
          value={video}
          label="Видео"
          margin="dense"
          style={{ margin: 6 }}
          onChange={this.handleChange}
          InputLabelProps={{ shrink: true }}
          placeholder="https://www.youtube.com/"
        />
        <Button size="small" onClick={this.handleAddVideo}>Добавить</Button>
      </div>
    )
  }
}


AddVideo.propTypes = {
  actions: object.isRequired,
  classes: object.isRequired,
  videos: array,
}

AddVideo.defaultProps = {
  videos: [],
}

export default withStyles(styles)(connector(AddVideo))
