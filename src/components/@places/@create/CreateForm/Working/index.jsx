import React from 'react'
import { Field } from 'formik'
import FormikText from '../formik/FormikText'

const Working = () =>
  <React.Fragment>
    <Field
      component={FormikText}
      name="working_day"
      label="Рабочие дни"
      placeholder="Понедельникн - Пятница"
    />
    <Field
      component={FormikText}
      name="working_hours"
      label="Часы работы"
      placeholder="8:00 - 23:00"
    />
  </React.Fragment>

Working.propTypes = {}

export default Working
