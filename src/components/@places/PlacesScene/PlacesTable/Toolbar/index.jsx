import React, { Component } from 'react'
import { number, object } from 'prop-types'
import { Toolbar, Typography, withStyles } from '@material-ui/core'
import PlaceSelected from './PlaceSelected'
import Search from './Search'
import connector from '../connector'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
    alignItem: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontWeight: 600,
  },
})

class EnhancedTableToolbar extends Component {
  state = {
    searchValue: '',
  }

  handleSearch = (e) => {
    const { actions, places: { places } } = this.props
    this.setState({ searchValue: e.target.value })
    actions.placesTable.filter(places, e.target.value)
  }

  render() {
    const { numSelected, classes } = this.props
    return (
      <Toolbar className={classes.root}>
        <Typography component="div" className={classes.title} variant="title">
          Все места
        </Typography>
        <div className={classes.actions}>
          <PlaceSelected selected={numSelected} />
          <Search onChange={this.handleSearch} value={this.state.searchValue} />
        </div>
      </Toolbar>
    )
  }
}

EnhancedTableToolbar.propTypes = {
  classes: object.isRequired,
  places: object.isRequired,
  numSelected: number.isRequired,
  actions: object.isRequired,
}

export default withStyles(styles)(connector(EnhancedTableToolbar))
