import React from 'react'
import { Route, Switch } from 'react-router-dom'
import withTheme from 'utils/withTheme'
import Header from 'components/Header'
import Container from 'components/Container'
import Modal from 'components/Modal'
import IndexScene from './IndexScene/IndexScene'
import AuthLayout from './@auth/AuthLayout'
import PlacesLayout from './@places/PlacesLayout'

const LayoutScene = () =>
  <div>
    <Header />
    <Container>
      <Switch>
        <Route exact path="/" component={IndexScene} />
        <Route path="/auth" component={AuthLayout} />
        <Route path="/places" component={PlacesLayout} />
      </Switch>
    </Container>
    <Modal />
  </div>

export default withTheme(LayoutScene)
