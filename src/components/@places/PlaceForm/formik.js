import { withFormik } from 'formik'
import * as Yup from 'yup'
import transformValidationApi from 'utils/transformValidationApi'
import isEmpty from 'lodash/isEmpty'

const formik = withFormik({
  enableReinitialize: true,

  validationSchema: Yup.object()
    .shape({
      title: Yup.string().required('Это поле является обязательным'),
      address: Yup.object().required('Это поле является обязательным'),
      description: Yup.string(),
    }),

  mapPropsToValues: ({ place }) => ({
    title: place ? place.title : '',
    address: place ? place.address : {},
    pictures: place ? place.pictures : [],
    videos: place ? place.videos : [],
    details: place ? place.details : [],
    description: place ? place.description : '',
  }),

  handleSubmit: (values, { props: { actions, history, place }, setErrors, setSubmitting }) => {

    if (isEmpty(values.address)) {
      setErrors({ address: 'Нужно выбрать адрес из списка' })
      setSubmitting(false)
      return
    }

    const create = {
      title: values.title,
      address: values.address.formatted_address ? {
        address: values.address.formatted_address || values.address.address,
        lng: values.address.geometry ? values.address.geometry.location.lng() : values.address.lng,
        lat: values.address.geometry ? values.address.geometry.location.lat() : values.address.lat,
        placeId: values.address.place_id || values.address.placeId,
      } : place.address,
      details: values.details,
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
