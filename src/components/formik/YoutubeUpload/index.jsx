import React from 'react'
import { object } from 'prop-types'
import YoutubeUpload from 'components/controls/YoutubeUpload'

const FormikYoutubeUpload = ({ field, form, ...props }) => {
  const { name } = field
  const { errors, values, submitCount, setFieldValue, setFieldTouched } = form

  return (
    <YoutubeUpload
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

FormikYoutubeUpload.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
}

export default FormikYoutubeUpload
