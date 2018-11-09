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
    videos.push(video)

    actions.place.update({ videos })

    this.setState({
      video: '',
    })
    // TODO: this.setState not working
  }

  handleChange = event => {
    this.setState({
      video: event.target.value,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <TextField
          fullWidth
          label="Видео"
          placeholder="https://www.youtube.com/"
          margin="dense"
          style={{ margin: 6 }}
          InputLabelProps={{ shrink: true }}
          onChange={this.handleChange}
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
