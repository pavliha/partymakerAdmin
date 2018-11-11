/* eslint-disable no-console */
import { TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { any, bool, func, object, oneOfType, shape, string } from 'prop-types'

class Geosuggest extends Component {
  componentDidMount() {
    if (this.isGoogleAvailable()) {
      this.apiObj = this.initAutocomplete()

      this.apiObj.addListener('place_changed', this.handleChange)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.apiObj)
  }

  initAutocomplete = () => {
    const inputElement = document.getElementsByName(this.props.name)[0]
    return new window.google.maps.places.Autocomplete(inputElement, this.props.options)
  }

  isGoogleAvailable = () => typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined'

  handleChange = () => {
    this.props.onChange(this.props.name, this.apiObj.getPlace())
  }

  handleBlur = () => {
    this.props.onBlur(this.props.name, true)
  }

  render() {
    const {
      helperText,
      value,
      fullWidth,
      label,
      name,
      error,
      placeholder,
      disabled,
    } = this.props

    const helper = helperText || ''

    return (
      <TextField
        name={name}
        error={error}
        label={label}
        margin="dense"
        disabled={disabled}
        helperText={helper}
        fullWidth={fullWidth}
        style={{ margin: 6 }}
        onBlur={this.handleBlur}
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        defaultValue={value.formatted_address || (value.address || '')}
      />
    )
  }
}

Geosuggest.propTypes = {
  fullWidth: bool,
  error: bool,
  disabled: bool,
  name: string,
  placeholder: string,
  label: string,
  onChange: func,
  value: oneOfType([string, object]),
  onBlur: func,
  helperText: any,
  options: shape({}),
}

Geosuggest.defaultProps = {
  fullWidth: false,
  error: false,
  disabled: false,
  name: 'geosuggest',
  label: '',
  placeholder: '',
  helperText: '',
  value: '',
  onChange: () => {},
  onBlur: () => {},
  options: {},
}

export default Geosuggest
