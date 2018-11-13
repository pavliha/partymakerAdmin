import React from 'react'
import { Route, Switch } from 'react-router-dom'
import withTheme from 'utils/withTheme'
import Header from 'components/Header'
import Container from 'components/Container'
import Modal from 'components/Modal'
import IndexScene from './IndexScene/IndexScene'
import AuthLayout from './@auth/AuthLayout'
import PlacesLayout from './@places/PlacesLayout'
import SignedInRoute from './routes/SignedInRoute'
import SignedOutRoute from './routes/SignedOutRoute'
import Background from './Background'

const LayoutScene = () =>
  <Background>
    <Header />
    <Container>
      <Switch>
        <Route exact path="/" component={IndexScene} />
        <SignedOutRoute path="/auth" component={AuthLayout} />
        <SignedInRoute path="/places" component={PlacesLayout} />
      </Switch>
    </Container>
    <Modal />
  </Background>

export default withTheme(LayoutScene)
