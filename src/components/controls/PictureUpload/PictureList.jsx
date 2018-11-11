/* eslint-disable function-paren-newline */
import React from 'react'
import { array, func, object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import Thumbnail from './PictureThumbnail'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

class PictureList extends React.Component {
  delete = picture_url => () => {
    this.props.onDelete(picture_url)
  }

  render() {
    const { classes, pictures } = this.props

    return (
      <div className={classes.root}>
        {pictures.map(picture_url =>
          <Thumbnail
            key={picture_url}
            className={classes.video}
            onClick={this.delete(picture_url)}
            src={picture_url}
          />,
        )}
      </div>
    )
  }
}

PictureList.propTypes = {
  classes: object.isRequired,
  pictures: array.isRequired,
  onDelete: func.isRequired,
}

export default withStyles(styles)(PictureList)
