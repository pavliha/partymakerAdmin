import React, { Component } from 'react'
import { func, object, string } from 'prop-types'
import { IconButton, SvgIcon, withStyles, TextField } from '@material-ui/core'
import SearchIcon from 'mdi-react/SearchIcon'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIconButton: {
    marginLeft: 5,
  },
  searchIcon: {
    fontSize: 16,
  },
}

class Search extends Component {
  state = {
    isVisible: false,
  }

  toggleVisible = () => {
    this.setState(state => ({ isVisible: !state.isVisible }))
  }

  render() {
    const { classes, value, onChange } = this.props
    const { isVisible } = this.state
    return (
      <div className={classes.root}>
        {isVisible && (
          <TextField
            onChange={onChange}
            value={value}
          />
        )}

        <IconButton
          className={classes.searchIconButton}
          onClick={this.toggleVisible}
        >
          <SvgIcon
            color="primary"
            className={classes.searchIcon}
          >
            <SearchIcon />
          </SvgIcon>
        </IconButton>
      </div>
    )
  }
}

Search.propTypes = {
  classes: object.isRequired,
  value: string,
  onChange: func.isRequired,
}
Search.defaultProps = {
  value: '',
}

export default withStyles(styles)(Search)
