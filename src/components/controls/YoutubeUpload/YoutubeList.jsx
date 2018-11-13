/* eslint-disable function-paren-newline */
import React from 'react'
import { array, func, object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import YoutubeThumbnail from './YoutubeThumbnail'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

class YoutubeList extends React.Component {
  delete = youtube_id => () => {
    this.props.onDelete(youtube_id)
  }

  render() {
    const { classes, youtube_ids } = this.props

    return (
      <div className={classes.root}>
        {youtube_ids.map(youtube_id =>
          <YoutubeThumbnail
            key={youtube_id}
            youtube_id={youtube_id}
            onClick={this.delete(youtube_id)}
          />,
        )}
      </div>
    )
  }
}

YoutubeList.propTypes = {
  classes: object.isRequired,
  youtube_ids: array.isRequired,
  onDelete: func.isRequired,
}

export default withStyles(styles)(YoutubeList)
