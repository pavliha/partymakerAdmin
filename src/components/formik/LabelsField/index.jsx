import React from 'react'
import { object } from 'prop-types'
import LabelsField from 'components/controls/LabelsField'

const FormikLabelsField = ({ field, form, ...props }) => {
  const { name } = field
  const { errors, values, submitCount, setFieldValue, setFieldBlur } = form

  return (
    <LabelsField
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

FormikLabelsField.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
}

export default FormikLabelsField
