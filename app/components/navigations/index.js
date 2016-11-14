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
  Wall
} from '~/app/components'

/**
 * launch: intro, login
 */

export function renderHeader(scene) {
  const { theme } = this.props
  /* here key is 'scene_{theKey}' */
  const { index, key, route } = scene

  switch (route.key) {
    case 'intro':
      return null
    case 'login':
      return null
    case 'homes-index':
      return null
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
  const { theme } = this.props
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

