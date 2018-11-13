import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import NotFound from 'components/NotFound'
import PlaceForm from '../../PlaceForm'
import connector from './connector'

const styles = theme => ({
  root: {
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'center',

  },
  card: {
    padding: '20px 30px',
    margin: '20px auto',
    height: '100%',
    width: 370,
    [theme.breakpoints.up('md')]: {
      margin: '20px 30px',
    },
  },
  search: {
    padding: 30,
    paddingBottom: 0,
  },
  typography: {
    paddingTop: 20,
  },
  place_event: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
})

class EditScene extends React.Component {
  componentDidMount() {
    const { actions } = this.props

    actions.header.setTitle('Редактирование места')
    actions.header.back()
    document.title = 'Редактирование места'
    this.loadPlaces()
  }

  componentWillUnmount() {
    const { actions } = this.props
    this.props.actions.header.resetTitle()
    actions.header.menu()
  }

  loadPlaces = () => {
    const { actions, places: { places, current } } = this.props
    const place = places[current]

    if (!place) actions.places.load()
  }

  render() {
    const { classes, match, places: { places } } = this.props
    const place = places[match.params.id]
    if (!place) return <NotFound />

    return (
      <div className={classes.root}>
        <PlaceForm place={place} />
      </div>
    )
  }
}

EditScene.propTypes = {
  classes: object.isRequired,
  actions: object.isRequired,
  places: object.isRequired,
  match: object.isRequired,
}

export default connector(withStyles(styles)(EditScene))
