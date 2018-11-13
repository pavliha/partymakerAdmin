/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/sort-comp */
import React from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, withStyles } from '@material-ui/core'
import connector from './connector'

const styles = {
  root: {
    display: 'flex',
  },

  menuItem: {
    '&:focus': {
      outline: 'none',
    },
  },
}

class UserMenu extends React.Component {
  logout = () => {
    const { actions } = this.props
    actions.auth.logout()
  }

  render() {
    const { classes, auth } = this.props

    return (
      <div className={classes.root}>

        {auth.user
          ? (
            <React.Fragment>
              <Link to="/places/create"><Button color="inherit">Создать место</Button></Link>
              <Link to="/places"><Button color="inherit">Места</Button></Link>
              <Button style={{ color: 'white' }} onClick={this.logout}>Выйти</Button>
            </React.Fragment>
          )
          : <Link to="/auth/login"><Button style={{ color: 'white' }}> Войти </Button></Link>
        }
      </div>
    )
  }
}

UserMenu.propTypes = {
  classes: object.isRequired,
  auth: object.isRequired,
  actions: object.isRequired,
}

export default withStyles(styles)(connector(UserMenu))
