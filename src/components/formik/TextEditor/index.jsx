import React from 'react'
import { object } from 'prop-types'
import TextEditor from 'components/controls/TextEditor'

const FormikTextField = ({ field, form, ...props }) => {
  const { name } = field
  const { errors, values, submitCount, setFieldValue, setFieldBlur } = form

  return (
    <TextEditor
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

FormikTextField.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
}

export default FormikTextField
