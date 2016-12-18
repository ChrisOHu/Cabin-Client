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
  HomesMap,
  PostHome,
  BecomeHost,
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
    case 'homes-index':
      return null
    case 'become-host':
      return (
        <Header theme={theme} >
          <Button transparent onPress={() => Events.emit("cabin/become-host/pop")} >
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{t('becomeHost')}</Title>

          <Button transparent onPress={() => Events.emit("cabin/become-host/post")} >
            {t('post')}
          </Button>
        </Header>
      )
    case 'post-home':
      return (
        <Header theme={theme} >
          <Button transparent onPress={() => {pop()}} >
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{t('newHome')}</Title>

          <Button transparent onPress={() => Events.emit("cabin/post-home/post")} >
            {t('post')}
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
    case 'homes-index':
      return <HomesMap />
    case 'become-host':
      return <BecomeHost />
    case 'post-home':
      return <PostHome />
    default:
      return undefined
  }
}

export default {
  renderHeader, renderScene
}

