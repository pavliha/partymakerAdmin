import React from 'react'
import { func, object, shape, string } from 'prop-types'
import { Button, Grid, withStyles } from '@material-ui/core'

import Geosuggest from 'components/Geosuggest'
import FormikText from '../formik/FormikText'
import WorkingHours from './WorkingHours'
import AddPicture from './AddPicture'

import { Field, Form } from 'formik'
import formik from './formik'

import connector from './connector'

const styles = theme => ({
  checked: {
    height: 25,
  },

  buttonGroup: {
    marginTop: theme.spacing.size4,
    marginBottom: theme.spacing.size3,
    '@media only screen and (max-width: 320px)': {
      marginTop: theme.spacing.size1,
      marginBottom: 0,
    },
  },
})

const CreateForm = ({ classes, values, errors, touched, setFieldValue, setFieldTouched }) =>
  <Form>
    <Field
      name="title"
      placeholder="Шевчик"
      label="Название места"
      component={FormikText}
    />

    <Geosuggest
      fullWidth
      label="Адрес"
      name="address"
      value={values.address}
      onChange={setFieldValue}
      onBlur={setFieldTouched}
      placeholder="Адрес места"
      helperText={errors.address}
      error={!!errors.address && touched.address}
    />

    <WorkingHours />
    <AddPicture />

    <Field
      rows={2}
      multiline
      rowsMax={3}
      label="Описание"
      name="description"
      component={FormikText}
      placeholder="Описание места"
    />

    <Grid
      container
      justify="center"
      className={classes.buttonGroup}
    >
      <Button
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
      >
        Создать место
      </Button>
    </Grid>
  </Form>

CreateForm.propTypes = {
  classes: object.isRequired,
  values: shape({
    address: object,
  }).isRequired,
  setFieldValue: func.isRequired,
  setFieldTouched: func.isRequired,
  errors: shape({
    address: string,
  }).isRequired,
  touched: object.isRequired,
}

export default withStyles(styles)(connector(formik(CreateForm)))
