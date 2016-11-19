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
  Home,
  HomesMap,
  Painters,
  Wall,
  MyProfile
} from '~/app/components'

import Events from '~/app/Events'

/**
 * launch: intro, login
 */

export function renderHeader(scene) {
  const { theme, user, push, pop } = this.props
  /* here key is 'scene_{theKey}' */
  const { index, key, route } = scene

  switch (route.key) {
    case 'intro':
      return null
    case 'login':
      return null
    case 'homes-index':
      return null
    case 'painters-index':
      return null
    case 'wall-index':
      return null
    case 'my-profile':
      return (
        <Header>
          <Button transparent onPress={() => Events.emit("cabin/my-profile/pop")} >
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{user && user.name}</Title>

          <Button transparent onPress={() => Events.emit("cabin/my-profile/save")} >
            Save
          </Button>
        </Header>
      )
    default:
      return (
        <Header>
          <Button transparent>
            <Icon name="ios-boat-outline" />
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
  const { theme, user } = this.props
  const { index, key, route } = scene

  switch (route.key) {
    case 'login':
      return <Login />
    case 'homes-index':
      return <HomesMap />
    case 'painters-index':
      return <Painters />
    case 'wall-index':
      return <Wall />
    case 'my-profile':
      return <MyProfile />
    case 'intro':
    default:
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            {'Scene: ' + key}
          </Text>
        </View>
      )
  }
}

