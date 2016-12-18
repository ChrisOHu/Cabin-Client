import React, {
  Component,
  PropTypes
} from 'react'
import {
  View,
  Text,
  StyleSheet
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
  FiveThirty
} from '~/app/components'

import t from 'counterpart'

import Events from '~/app/Events'

function renderHeader(scene) {
  const { theme, push, pop } = this.props
  const user = this.props.users.user 
  /* here key is 'scene_{theKey}' */
  const { index, key, route } = scene

  switch (route.key) {
    case 'intro':
      return null
    case 'login':
      return null
    default:
      return undefined
  }
}

function renderScene(scene) {
  const { theme, users } = this.props
  const { index, key, route } = scene

  switch (route.key) {
    case 'intro':
      return <FiveThirty />
    case 'login':
      return <Login />
    default:
      return undefined
  }
}

export default {
  renderHeader, renderScene
}

