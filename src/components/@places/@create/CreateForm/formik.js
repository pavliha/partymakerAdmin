import { withFormik } from 'formik'
import * as Yup from 'yup'
import transformValidationApi from 'utils/transformValidationApi'

const formik = withFormik({
  enableReinitialize: true,

  validationSchema: Yup.object()
    .shape({
      title: Yup.string()
        .required('Это поле является обязательным'),
      working_day: Yup.string(),
      working_hours: Yup.string(),
      description: Yup.string(),

    }),

  mapPropsToValues: () => ({
    title: '',
    address: '',
    working_day: '',
    working_hours: '',
    description: '',
  }),

  handleSubmit: (values, { props: { actions }, setErrors, setSubmitting }) => {
    const create = {
      title: values.title,
      address: {
        address: values.address.formatted_address,
        lng: values.address.geometry.location.lng(),
        lat: values.address.geometry.location.lat(),
        placeId: values.address.place_id,
      },
      working_day: values.working_day,
      working_hours: values.working_hours,
      pictures: [],
      description: values.description,
    }

    actions.place.create(create)
      .then(() => {
        setSubmitting(false)
      })
      .catch(errors => {
        setSubmitting(false)
        setErrors(transformValidationApi(errors))
      })
  },
  displayName: 'CreatePlace',
})

export default formik
