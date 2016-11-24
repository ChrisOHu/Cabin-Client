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
  HomesMap,
  PostHome,
  Designers,
  Wall,
  MyProfile,
  BecomeHost,
  BecomeDesigner,
  FiveThirty
} from '~/app/components'

import t from 'counterpart'

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
            {t("save")}
          </Button>
        </Header>
      )
    case 'become-host':
      return (
        <Header theme={theme} >
          <Button transparent onPress={() => {pop()}} >
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{t('becomeHost')}</Title>

          <Button transparent onPress={() => Events.emit("cabin/become-host/post")} >
            {t('post')}
          </Button>
        </Header>
      )
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
    case 'post-home':
      return <PostHome />
    case 'intro':
    default:
      return <FiveThirty />
  }
}

