import React from 'react'
import { func, object, shape, string } from 'prop-types'
import { Button, Grid, withStyles } from '@material-ui/core'

import Geosuggest from 'components/Geosuggest'
import FormikText from './formik/FormikText'
import Working from './Working'
import AddPicture from './AddPicture'
import Videos from './Videos'
import AddVideo from './Videos/AddVideo'

import { Field, Form } from 'formik'
import formik from './formik'

import connector from './connector'


const styles = theme => ({
  checked: {
    height: 25,
  },

  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.size4,
    marginBottom: theme.spacing.size3,
    '@media only screen and (max-width: 320px)': {
      marginTop: theme.spacing.size1,
      marginBottom: 0,
    },
  },
})

class CreateForm extends React.Component {
  handleCancel = () => {
    const { actions } = this.props
    actions.places.cancel()

    actions.place.update({
      pictures: [],
      videos: [],
    })
  }

  render() {
    const { classes, current, values, errors, touched, setFieldValue, setFieldTouched } = this.props
    return (
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

        <Working />
        <AddPicture pictures={values.pictures} />
        <Videos videos={values.videos} />
        <AddVideo videos={values.videos} />

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
            fullWidth={!current}
            size="large"
            type="submit"
            color="primary"
            variant="contained"
          >
            {current ? 'Сохранить' : 'Создать место'}
          </Button>
          {current && <Button onClick={this.handleCancel}>Отмена</Button>}
        </Grid>
      </Form>
    )
  }
}


CreateForm.propTypes = {
  actions: object.isRequired,
  classes: object.isRequired,
  current: object,
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

CreateForm.defaultProps = {
  current: undefined,
}

export default withStyles(styles)(connector(formik(CreateForm)))
