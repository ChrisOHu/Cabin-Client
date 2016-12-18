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
  Wall,
  MyProfile,
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
            {t("save")}
          </Button>
        </Header>
      )

    default:
      return undefined
  }
}

function renderScene(scene) {
  const { theme, users } = this.props
  const { index, key, route } = scene

  switch (route.key) {
    case 'wall-index':
      return <Wall />
    case 'my-profile':
      return <MyProfile />
    default:
      return undefined
  }
}

export default {
  renderHeader, renderScene
}

