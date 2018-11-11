import React from 'react'
import { func, number, object, shape, string } from 'prop-types'
import { TextField } from '@material-ui/core'

const FormikText = ({ field, form, ...props }) =>
  <TextField
    {...props}
    {...field}
    fullWidth
    margin="dense"
    style={{ margin: 6 }}
    InputLabelProps={{ shrink: true }}
    error={(form.submitCount > 0) && !!form.errors[field.name]}
    helperText={(form.submitCount > 0) && form.errors[field.name]}
  />

FormikText.propTypes = {
  field: shape({
    name: string,
    value: string,
    onChange: func,
    onBlur: func,
  }).isRequired,
  form: shape({
    errors: object,
    submitCount: number,
  }).isRequired,
}

export default FormikText
