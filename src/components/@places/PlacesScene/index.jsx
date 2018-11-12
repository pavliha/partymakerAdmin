import React from 'react'
import { object } from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core'
import Loading from 'components/Loading'
import PlacesTable from './PlacesTable'
import connector from './connector'
import DeleteDialog from './DeleteDialog'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'grid',
    paddingTop: 15,
    maxWidth: 1300,
    margin: '0 auto',
    gridGap: '15px',
    gridTemplateColumns: '370px',

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '370px 370px',
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '400px 400px 400px',
    },
  },
})

class PlacesScene extends React.Component {

  state = {
    isOpenDialog: false,
    place: null,
  }

  componentDidMount() {
    const { actions, places } = this.props
    if (!places.allLoaded) actions.places.load()

    document.title = 'Места в Запорожье'
  }

  deletePlace = (place) => {
    this.setState({ isOpenDialog: true, place })
  }

  handleClose = () => {
    this.setState({ isOpenDialog: false })
  }

  handleDeleteConfirm = () => {
    const { actions } = this.props
    actions.places.remove(this.state.place)
    this.setState({ isOpenDialog: false })
  }


  editPlace = async (place) => {
    const { actions } = this.props
    actions.places.edit(place)
  }

  render() {
    const { classes, places: { loading, places } } = this.props
    if (loading) return <Loading />
    if (isEmpty(places)) return null

    return (
      <div className={classes.root}>
        <PlacesTable onEdit={this.editPlace} onDelete={this.deletePlace} />
        <DeleteDialog
          isOpen={this.state.isOpenDialog}
          onClose={this.handleClose}
          onConfirm={this.handleDeleteConfirm}
        />
      </div>
    )
  }
}

PlacesScene.propTypes = {
  classes: object.isRequired,
  places: object.isRequired,
  actions: object.isRequired,
}

export default withStyles(styles)(connector(PlacesScene))
