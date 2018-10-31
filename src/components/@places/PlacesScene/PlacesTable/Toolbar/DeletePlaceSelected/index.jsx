import React from 'react'
import { array, object } from 'prop-types'
import { IconButton } from '@material-ui/core'
import DeleteIcon from 'mdi-react/DeleteIcon'
import connector from './connector'

class DeletePlaceSelected extends React.Component {
  deletePlaces = () => {
    const { actions, selected } = this.props
    actions.place.deletePlaces(selected)
    actions.places.load()
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.deletePlaces}>
          <DeleteIcon />
        </IconButton>
      </div>
    )

  }
}

DeletePlaceSelected.propTypes = {
  actions: object.isRequired,
  selected: array.isRequired,
}

export default connector(DeletePlaceSelected)
