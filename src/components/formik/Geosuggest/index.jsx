/* eslint-disable import/extensions */
import React from 'react'
import { object } from 'prop-types'
import Geosuggest from 'components/controls/Geosuggest'

const FormikGeosuggest = ({ field, form, ...props }) => {
  const { name, onChange, onBlur } = field
  const { errors, values, submitCount } = form

  return (
    <Geosuggest
      fullWidth
      {...props}
      onChange={onChange}
      onBlur={onBlur}
      value={values[name]}
      name={name}
      error={!!(errors[name] && (submitCount > 0))}
      helperText={(submitCount > 0) && errors[name]}
    />
  )
}

FormikGeosuggest.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
}

export default FormikGeosuggest
