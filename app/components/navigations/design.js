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
  DesignIndex,
  Designers,
  BecomeDesigner,
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
    case 'design-index':
      return (
        <Header theme={theme} >
          <Button transparent onPress={() => {pop()}} >
            <Icon name="ios-boat" />
          </Button>

          <Title>{''}</Title>

          <Button transparent onPress={() => {}} >
            {''}
          </Button>
        </Header>
      )
    case 'designers':
      return null
    case 'become-designer':
      return (
        <Header theme={theme} >
          <Button transparent onPress={() => {pop()}} >
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{t('becomeDesigner')}</Title>

          <Button transparent onPress={() => Events.emit("cabin/become-designer/post")} >
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
    case 'design-index':
      return <DesignIndex />
    case 'designers':
      return <Designers />
    case 'become-designer':
      return <BecomeDesigner />
    default:
      return undefined
  }
}

export default {
  renderHeader,
  renderScene
}

