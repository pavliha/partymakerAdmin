/* eslint-disable import/extensions */
import React from 'react'
import { object } from 'prop-types'
import Geosuggest from 'components/controls/Geosuggest'

const FormikGeosuggest = ({ field, form, ...props }) => {
  const { name } = field
  const { errors, values, submitCount, setFieldValue, setFieldBlur } = form

  return (
    <Geosuggest
      fullWidth
      {...props}
      onChange={setFieldValue}
      onBlur={setFieldBlur}
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
