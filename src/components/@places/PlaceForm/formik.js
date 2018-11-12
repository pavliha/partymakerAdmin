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

  mapPropsToValues: ({ place }) => ({
    title: place ? place.title : '',
    address: place ? place.address.address : {},
    working_day: place ? place.working_day : '',
    working_hours: place ? place.working_hours : '',
    pictures: place ? place.pictures : [],
    videos: place ? place.videos : [],
    description: place ? place.description : '',
  }),

  handleSubmit: (values, { props: { actions, history, place }, setErrors, setSubmitting }) => {
    const create = {
      title: values.title,
      address: values.address.formatted_address ? {
        address: values.address.formatted_address || values.address.address,
        lng: values.address.geometry ? values.address.geometry.location.lng() : values.address.lng,
        lat: values.address.geometry ? values.address.geometry.location.lat() : values.address.lat,
        placeId: values.address.place_id || values.address.placeId,
      } : place.address,
      working_day: values.working_day,
      working_hours: values.working_hours,
      pictures: values.pictures || [],
      videos: values.videos || [],
      description: values.description,
    }

    function handle(func) {
      func.then(({ value: newPlace }) => {
        setSubmitting(false)
        history.push(`/places/${newPlace.id}`)
      })
        .catch((errors) => {
          setSubmitting(false)
          setErrors(transformValidationApi(errors))
        })
    }

    if (place) {
      handle(actions.place.update(place.id, create))
    } else {
      handle(actions.place.create(create))
    }
  },
  displayName: 'CreatePlace',
})

export default formik
