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
    address: form ? form.address : {},
    working_day: current ? current.working_day : '',
    working_hours: current ? current.working_hours : '',
    pictures: form ? form.pictures : [],
    videos: form ? form.videos : [],
    description: current ? current.description : '',
  }),

  handleSubmit: (values, { props: { actions, form, current }, resetForm, setErrors, setSubmitting }) => {
    const create = {
      title: values.title,
      address: {
        address: values.address.formatted_address || values.address.address,
        lng: values.address.geometry ? values.address.geometry.location.lng() : values.address.lng,
        lat: values.address.geometry ? values.address.geometry.location.lat() : values.address.lat,
        placeId: values.address.place_id || values.address.placeId,
      },
      working_day: values.working_day,
      working_hours: values.working_hours,
      pictures: form.pictures || [],
      videos: form.videos || [],
      description: values.description,
    }

    function dispatch(func) {
      func.then((result) => {
        setSubmitting(false)
        actions.place.set(result)
        resetForm()
      })
        .catch((errors) => {
          setSubmitting(false)
          setErrors(transformValidationApi(errors))
        })
    }

    if (current) {
      dispatch(actions.place.updatePlace(current.id, create))
    } else {
      dispatch(actions.place.create(create))
    }
  },
  displayName: 'CreatePlace',
})

export default formik
