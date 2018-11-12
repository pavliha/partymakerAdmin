import React from 'react'
import { Form, Field } from 'formik'
import { object, bool } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import TextField from 'components/formik/TextField'
import Geosuggest from 'components/formik/Geosuggest'
import PictureUpload from 'components/formik/PictureUpload'
import YoutubeUpload from 'components/formik/YoutubeUpload'
import TextEditor from 'components/formik/TextEditor'
import connector from './connector'
import formik from './formik'

const styles = theme => ({
  root: {
    maxWidth: 984,
  },

  actions: {
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

class CreatePlaceForm extends React.Component {
  handleCancel = () => {
    const { actions } = this.props
    actions.places.cancel()

    actions.place.update({
      pictures: [],
      videos: [],
    })
  }

  render() {
    const { classes, isEdit } = this.props
    return (
      <Form className={classes.root}>
        <Field
          name="title"
          placeholder="Шевчик"
          label="Название места"
          component={TextField}
        />

        <Field
          name="address"
          label="Адрес"
          component={Geosuggest}
          placeholder="Адрес места"
        />

        <Field
          component={TextField}
          name="working_day"
          label="Рабочие дни"
          placeholder="Понедельник - Пятница"
        />

        <Field
          component={TextField}
          name="working_hours"
          label="Часы работы"
          placeholder="8:00 - 23:00"
        />

        <Field
          label="Добавить фотографии места "
          component={PictureUpload}
          name="pictures"
        />

        <Field
          placeholder="Вставьте сслыку из youtube сюда"
          component={YoutubeUpload}
          name="videos"
        />

        <Field
          label="Описание"
          name="description"
          component={TextEditor}
          placeholder="Описание места"
        />

        <div className={classes.actions}>
          <Button
            size="large"
            type="submit"
            color="primary"
            variant="contained"
          >
            {isEdit ? 'Сохранить' : 'Создать место'}
          </Button>
          {isEdit && <Button onClick={this.handleCancel}>Отмена</Button>}
        </div>
      </Form>
    )
  }
}

CreatePlaceForm.propTypes = {
  actions: object.isRequired,
  classes: object.isRequired,
  isEdit: bool,
}
CreatePlaceForm.defaultProps = {
  isEdit: false,
}

export default withStyles(styles)(connector(formik(CreatePlaceForm)))
