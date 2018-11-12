/* eslint-disable function-paren-newline,react/prefer-stateless-function,no-return-assign */
import React from 'react'
import Http from 'services/Http'
import { bool, array, func, object, string } from 'prop-types'
import { FormControl, FormHelperText, FormLabel, withStyles } from '@material-ui/core'
import PictureList from './PictureList'
import UploadThumbnail from './UploadThumbnail'

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16,
  },
  fileInput: {
    opacity: 0,
    position: 'absolute',
  },
  pictureList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    paddingBottom: 16,
  },
})

class PictureUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uploadingPicture: '',
      progress: 0,
    }
  }

  add = (image) => {
    if (image.type.match(/image.*/)) {
      const reader = new FileReader()
      reader.onload = () => {
        this.setState({ uploadingPicture: reader.result })
      }
      reader.readAsDataURL(image)
    }
  }

  upload = async (image) => {
    const formData = new FormData()
    formData.append('image', image)

    const response = await Http.post('/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({ progress, uploadingPicture: '' })
      },
    })

    this.setState({ progress: 0 })

    return response.url
  }

  handleAdd = async (e) => {
    const { onChange, name, value } = this.props
    const image = e.target.files[0]
    this.add(image)
    const picture_url = await this.upload(image)

    onChange(name, [...value, picture_url])
  }

  handleBlur = () => {
    const { onBlur, name } = this.props
    onBlur(name, true)
  }

  handleDelete = (picture_url) => {
    const { onChange, name, value } = this.props
    const pictures = value.filter(picture => picture !== picture_url)

    onChange(name, pictures)
  }

  clickInput = () => {
    this.fileInput.click()
  }

  render() {
    const { classes, name, error, label, value, helperText } = this.props
    const { uploadingPicture, progress } = this.state

    return (
      <FormControl className={classes.root}>
        <FormLabel className={classes.label} component="legend">{label}</FormLabel>
        <div className={classes.pictureList}>
          <PictureList pictures={value} onDelete={this.handleDelete} />
          <UploadThumbnail
            loadingPicture={uploadingPicture}
            progress={progress}
            onClick={this.clickInput}
          />
        </div>

        <input
          className={classes.fileInput}
          ref={input => this.fileInput = input}
          onChange={this.handleAdd}
          onBlur={this.handleBlur}
          name={name}
          accept="image/*"
          type="file"
        />

        {helperText && <FormHelperText error={error} id="name-error-text">{helperText}</FormHelperText>}
      </FormControl>
    )
  }
}

PictureUpload.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  value: array,
  helperText: string,
  error: bool,
  label: string,
  onBlur: func,
}
PictureUpload.defaultProps = {
  helperText: '',
  label: '',
  value: [],
  error: false,
  onBlur: () => {},
}

export default withStyles(styles)(PictureUpload)
