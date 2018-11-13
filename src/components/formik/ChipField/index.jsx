import React from 'react'
import { object } from 'prop-types'
import ChipField from 'components/controls/ChipField'

const FormikChipField = ({ field, form, ...props }) => {
  const { name, onBlur } = field
  const { errors, values, submitCount, setFieldValue } = form

  return (
    <ChipField
      fullWidth
      {...props}
      onChange={setFieldValue}
      onBlur={onBlur}
      value={values[name]}
      name={name}
      error={!!(errors[name] && (submitCount > 0))}
      helperText={(submitCount > 0) && errors[name]}
    />
  )
}

FormikChipField.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
}

export default FormikChipField
