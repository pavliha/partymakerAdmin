import React from 'react'
import { Field } from 'formik'
import FormikText from '../../formik/FormikText'

const WorkingHours = () =>
  <div>
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
  </div>

WorkingHours.propTypes = {}

export default WorkingHours
