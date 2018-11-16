/* eslint-disable no-console */
import { TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { any, bool, func, object, oneOfType, shape, string } from 'prop-types'
import isEmpty from 'lodash/isEmpty'

class Geosuggest extends Component {
  constructor(props) {
    super(props)
    const value = props.value.formatted_address || props.value.address
    this.state = {
      text: value,
    }
  }

  componentDidMount() {
    if (this.isGoogleAvailable()) {
      this.apiObj = this.initAutocomplete()

      this.apiObj.addListener('place_changed', () => {
        const obj = this.apiObj.getPlace()
        if (!isEmpty(obj)) {
          this.setState({ text: obj.formatted_address })
          this.props.onChange(this.props.name, obj)
        }
      })
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

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  handleBlur = () => {
    this.props.onBlur(this.props.name, true)
  }

  render() {
    return (
      <TextField
        {...this.props}
        autoComplete="street-address"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.state.text || ''}
      />
    )
  }
}

Geosuggest.propTypes = {
  fullWidth: bool,
  error: bool,
  disabled: bool,
  name: string.isRequired,
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
  label: '',
  placeholder: '',
  helperText: '',
  value: '',
  onChange: () => {},
  onBlur: () => {},
  options: {},
}

export default Geosuggest
