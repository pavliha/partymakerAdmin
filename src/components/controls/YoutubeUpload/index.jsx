/* eslint-disable function-paren-newline,react/prefer-stateless-function,no-return-assign */
import React from 'react'
import { array, func, object, string } from 'prop-types'
import { withStyles, TextField, Button } from '@material-ui/core'
import getYoutubeId from 'utils/getYoutubeId'
import YoutubeList from './YoutubeList'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16,
    marginBottom: theme.spacing.size4,
  },
  fileInput: {
    opacity: 0,
    position: 'absolute',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  urlInput: {
    display: 'flex',
  },
  addUrlButton: {
    minWidth: 120,
  },

})

class VideoUpload extends React.Component {

  add = () => {
    const { onChange, name, value } = this.props
    const youtube_id = getYoutubeId(this.urlInput.value)
    if (youtube_id) {
      onChange(name, [...value, youtube_id])
      this.urlInput.value = ''
    }
  }

  delete = (youtube_id) => {
    const { onChange, name, value } = this.props
    onChange(name, value.filter(y_id => y_id !== youtube_id))
  }

  render() {
    const { classes, value, ...props } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.list}>
          <YoutubeList youtube_ids={value} onDelete={this.delete} />
        </div>
        <div className={classes.urlInput}>
          <TextField type="url" {...props} inputRef={(input) => { this.urlInput = input }} fullWidth />
          <Button color="default" className={classes.addUrlButton} onClick={this.add}>Add url</Button>
        </div>
      </div>
    )
  }
}

VideoUpload.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  value: array,
  onChange: func.isRequired,
}
VideoUpload.defaultProps = {
  value: [],
}

export default withStyles(styles)(VideoUpload)
