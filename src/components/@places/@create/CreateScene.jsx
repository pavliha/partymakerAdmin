import React from 'react'
import { object } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Typography, withStyles } from '@material-ui/core'

import CreateForm from './CreateForm'
import PlacesScene from '../PlacesScene'

import connector from './connector'

const styles = theme => ({
  root: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
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

class CreateScene extends React.Component {
  componentDidMount() {
    const { actions } = this.props

    actions.header.setTitle('Создание')
    actions.header.back()
    document.title = 'Создание компании'
  }

  componentWillUnmount() {
    const { actions } = this.props
    this.props.actions.header.resetTitle()
    actions.header.menu()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CreateForm />
        </Card>
        <div className={classes.place_event}>
          <Typography variant="subheading" className={classes.typography}>Все места</Typography>
          <PlacesScene />
        </div>
      </div>
    )
  }
}

CreateScene.propTypes = {
  classes: object.isRequired,
  actions: object.isRequired,
}

const router = withRouter(CreateScene)
const style = withStyles(styles)(router)

export default connector(style)
