import React from 'react'
import { object } from 'prop-types'
import PictureUpload from 'components/controls/PictureUpload'

const FormikPhotoUpload = ({ field, form, ...props }) => {
  const { name } = field
  const { errors, values, submitCount, setFieldValue, setFieldTouched } = form

  return (
    <PictureUpload
      {...props}
      onChange={setFieldValue}
      onBlur={setFieldTouched}
      value={values[name]}
      name={name}
      error={!!(errors[name] && (submitCount > 0))}
      helperText={(submitCount > 0) ? errors[name] : null}
    />
  )
}

FormikPhotoUpload.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
}

export default FormikPhotoUpload
