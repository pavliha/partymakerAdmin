/* eslint-disable camelcase */
import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import NotFound from 'components/NotFound'
import PictureGrid from 'components/PictureGrid'
import isEmpty from 'lodash/isEmpty'
import PlacePanel from './PlacePanel'
import connector from './connector'

const styles = theme => ({
  root: {
    display: 'flex',
    overflowX: 'hidden',
    position: 'relative',
    background: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },

  place: {
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: 500,
      flexBasis: '25%',
    },
  },
  grid: {
    flexGrow: 1,
    height: '100%',
    overflowY: 'auto',
  },
})

class PlaceScene extends React.Component {
  componentWillMount() {
    const { actions, match } = this.props
    this.openPlace(match.params.id)
    actions.header.back()
  }

  componentWillUnmount() {
    const { actions } = this.props
    this.props.actions.header.resetTitle()
    actions.header.menu()
  }

  openPlace = async (place_id) => {
    const { actions, places: { places, current } } = this.props
    const place = places[current]

    actions.places.open(place_id)

    if (!place) actions.places.load()
  }

  openModal = (picture_url) => {
    const { actions } = this.props
    actions.modal.show({ picture: picture_url })
  }

  render() {
    const { classes, places: { places, current } } = this.props
    const place = places[current]
    const labels = ['Природа', 'Активный отдых', 'Спорт', 'Бухичь']

    if (isEmpty(place)) return <NotFound />

    return (
      <div className={classes.root}>
        <div className={classes.place}>
          <PlacePanel place={place} labels={labels} />
        </div>
        <div className={classes.grid}>
          <PictureGrid
            pictures={place.pictures}
            videos={place.videos}
            onClick={this.openModal}
          />
        </div>
      </div>
    )
  }
}

PlaceScene.propTypes = {
  classes: object.isRequired,
  places: object.isRequired,
  actions: object.isRequired,
  match: object.isRequired,
}

export default withStyles(styles)(connector(PlaceScene))
