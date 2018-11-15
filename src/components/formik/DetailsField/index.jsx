import React from 'react'
import { object } from 'prop-types'
import DetailsField from 'components/controls/DetailsField'

const FormikDetailsField = ({ field, form, ...props }) => {
  const { name } = field
  const { errors, values, submitCount, setFieldValue, setFieldBlur } = form

  return (
    <DetailsField
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

FormikDetailsField.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
}

export default FormikDetailsField
