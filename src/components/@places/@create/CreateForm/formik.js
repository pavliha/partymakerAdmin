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

  mapPropsToValues: ({ current, form }) => ({
    title: current ? current.title : '',
    address: current ? current.align : {},
    working_day: current ? current.working_day : '',
    working_hours: current ? current.working_hours : '',
    pictures: (current || form) ? ((current && current.pictures) || (form && form.pictures)) : [],
    videos: (current || form) ? ((current && current.videos) || (form && form.videos)) : [],
    description: current ? current.description : '',
  }),

  handleSubmit: (values, { props: { actions, form, current }, resetForm, setErrors, setSubmitting }) => {
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
      pictures: form.pictures || [],
      videos: form.videos || [],
      description: values.description,
    }

    if (current) {
      actions.place.updatePlace(current.id, create)
        .then(() => {
          setSubmitting(false)
          resetForm()
          actions.places.load()
          actions.place.update({ pictures: [], videos: [] })
        })
        .catch(errors => {
          setSubmitting(false)
          setErrors(transformValidationApi(errors))
        })
    } else {
      actions.place.create(create)
        .then(() => {
          setSubmitting(false)
          resetForm()
          actions.places.load()
          actions.place.update({ pictures: [], videos: [] })
        })
        .catch(errors => {
          setSubmitting(false)
          setErrors(transformValidationApi(errors))
        })
    }
  },
  displayName: 'CreatePlace',
})

export default formik
