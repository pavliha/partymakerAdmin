import React from 'react'
import { object } from 'prop-types'
import Autosuggest from 'components/controls/Autosuggest'

const FormikAutosuggest = ({ field, form, ...props }) => {
  const { name, onBlur } = field
  const { errors, values, submitCount, setFieldValue } = form
  return (
    <Autosuggest
      fullWidth
      {...props}
      onChange={(e) => setFieldValue(name, e.value)}
      onBlur={onBlur}
      value={values[name]}
      name={name}
      error={!!(errors[name] && (submitCount > 0))}
      helperText={(submitCount > 0) && errors[name]}
    />
  )
}

FormikAutosuggest.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
}

export default FormikAutosuggest
