import React from 'react'
import { Button, withStyles } from '@material-ui/core'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'
import connector from './connector'
import BannerJumbotron from './Jumbotron'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    maxWidth: 600,
    margin: '0 auto',
    paddingLeft: 15,
    paddingRight: 15,
  },

  button: {
    marginBottom: 15,
  },
}

class IndexScene extends React.Component {
  componentDidMount() {
    const { actions } = this.props
    actions.layout.background('/images/summer.jpg')
    document.title = 'Admin panel'
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.layout.removeBackground()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <BannerJumbotron />
        <div>
          <Link to="/places/create">
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              size="large"
              color="primary"
            >
              Добавить место
            </Button>
          </Link>
          <Link to="/places">
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              size="large"
              color="primary"
            >
             Смотреть список мест
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

IndexScene.propTypes = {
  classes: object.isRequired,
  actions: object.isRequired,
}

export default withStyles(styles)(connector(IndexScene))
