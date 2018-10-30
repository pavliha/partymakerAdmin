/* eslint-disable no-underscore-dangle */
import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import PictureUpload from 'components/PictureUpload'

import connector from './connector'


const styles = (theme) => ({
  root: {
    paddingTop: 15,
  },
  image: {
    padding: 10,
    paddingBottom: 0,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
})

class AddImage extends React.Component {
  handleUpload = (name, value) => {
    const { actions } = this.props
    // actions.groupCard.addPictures({ pictures: value })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography>Добавить фотографии</Typography>
        <div className={classes.image}>
          <PictureUpload
            name="pictures"
            onChange={this.handleUpload}
          />
        </div>
      </div>
    )
  }
}

AddImage.propTypes = {
  classes: object.isRequired,
  actions: object.isRequired,
}

export default withStyles(styles)(connector(AddImage))
