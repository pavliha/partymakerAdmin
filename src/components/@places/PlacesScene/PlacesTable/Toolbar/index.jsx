import React, { Component } from 'react'
import { number, object, string } from 'prop-types'
import { Toolbar, Typography, withStyles } from '@material-ui/core'
import ErrorCaption from './ErrorCaption'
import PeopleSelected from './PeopleSelected'
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

  handleSearch = e => {
    const { actions } = this.props
    this.setState({ searchValue: e.target.value })
    actions.places.filter(e.target.value)
  }

  render() {
    const { numSelected, classes } = this.props
    return (
      <Toolbar className={classes.root}>
        <Typography component="div" className={classes.title} variant="subheading">
          Select member for this channel
        </Typography>
        <div className={classes.actions}>
          <PeopleSelected selected={numSelected} />
          <Search onChange={this.handleSearch} value={this.state.searchValue} />
        </div>
      </Toolbar>
    )
  }
}

EnhancedTableToolbar.propTypes = {
  classes: object.isRequired,
  numSelected: number.isRequired,
  actions: object.isRequired,
}

export default withStyles(styles)(connector(EnhancedTableToolbar))
