import React, {
  Component,
  PropTypes
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  NavigationExperimental
} from 'react-native'

import {
  Header,
  InputGroup,
  Input,
  Title,
  Button,
  Icon
} from 'native-base'

import {
  Intro,
  Login,
  LoginModal,
  HomesMap,
  Designers,
  Wall,
  MyProfile,
  BecomeHost,
  BecomeDesigner,
  FiveThirty
} from '~/app/components'

import Events from '~/app/Events'

/** All the routes */
const routes = [
  { key: 'login'},
  { key: 'homes-index'},
  { key: 'designers-index'},
  { key: 'wall-index'},
  { key: 'homes-list'},
  { key: 'home-details'},
  { key: 'designer-details'},
  { key: 'my-profile'},
  { key: 'become-host'},
  { key: 'become-designer'},
  { key: 'host'},
  { key: 'designer'},
  { key: 'post-home'},
  { key: 'post-design'}
]

export function renderHeader(scene) {
  const { theme, push, pop } = this.props
  const user = this.props.users.user 
  /* here key is 'scene_{theKey}' */
  const { index, key, route } = scene

  switch (route.key) {
    case 'intro':
      return null
    case 'login':
      return null
    case 'homes-index':
      return null
    case 'designers-index':
      return null
    case 'wall-index':
      return null
    case 'my-profile':
      return (
        <Header theme={theme} >
          <Button transparent onPress={() => Events.emit("cabin/my-profile/pop")} >
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{user && user.name}</Title>

          <Button transparent onPress={() => Events.emit("cabin/my-profile/save")} >
            Save
          </Button>
        </Header>
      )
    case 'become-host':
    case 'become-designer':
    default:
      return (
        <Header theme={theme} >
          <Button transparent onPress={() => {pop()}} >
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{route.key}</Title>

          <Button transparent>
            <Icon name="ios-menu" />
          </Button>
        </Header>
      )
  }
}

export function renderScene(scene) {
  const { theme, users } = this.props
  const { index, key, route } = scene

  switch (route.key) {
    case 'login':
      return <Login />
    case 'homes-index':
      return <HomesMap />
    case 'designers-index':
      return <Designers />
    case 'wall-index':
      return <Wall />
    case 'my-profile':
      return <MyProfile />
    case 'become-host':
      return <BecomeHost />
    case 'become-designer':
      return <BecomeDesigner />
    case 'intro':
    default:
      return <FiveThirty />
  }
}

