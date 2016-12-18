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
  FiveThirty
} from '~/app/components'
import Launch from './launch'
import Design from './design'
import Explore from './explore'
import Home from './home'
import Store from './store'
import Wall from './wall'

import t from 'counterpart'
import Events from '~/app/Events'

/** All the routes */
const routes = [
  /** Launch */
  { key: 'intro' },
  { key: 'login'},

  /** Design */
  { key: 'design-index'},
  { key: 'designers' },
  { key: 'designer-details'},
  { key: 'become-designer'},
  { key: 'designer'},
  { key: 'post-design'},

  /** Explore */
  { key: 'explore-index' },

  /** Store */
  { key: 'store-index' },

  /** Wall (Users) */
  { key: 'wall-index'},
  { key: 'my-profile'},

  /** Home */
  { key: 'homes-index'},
  { key: 'homes-list'},
  { key: 'home-details'},
  { key: 'post-home'},
  { key: 'become-host'},
  { key: 'host'}

]

/**
 * `this` : Navigator's context
 * `scene`: is of SceneRendererProps.scene
 */
export function renderHeader(scene) {
  const { theme, push, pop, users } = this.props
  const { index, key, route } = scene

  let ret = undefined

  ret ? ret :
    (ret = Launch.renderHeader.call(this, scene))  !== undefined ? ret :
    (ret = Design.renderHeader.call(this, scene))  !== undefined ? ret :
    (ret = Explore.renderHeader.call(this, scene)) !== undefined ? ret :
    (ret = Store.renderHeader.call(this, scene))   !== undefined ? ret :
    (ret = Wall.renderHeader.call(this, scene))    !== undefined ? ret :
    (ret = Home.renderHeader.call(this, scene))    !== undefined ? ret :
    null

  return ret
}

/**
 * `this` : Navigator's context
 * `scene`: is of SceneRendererProps.scene
 */
export function renderScene(scene) {
  const { theme, users } = this.props
  const { index, key, route } = scene

  let ret = undefined

  ret ? ret :
    (ret = Launch.renderScene.call(this, scene))  !== undefined ? ret :
    (ret = Design.renderScene.call(this, scene))  !== undefined ? ret :
    (ret = Explore.renderScene.call(this, scene)) !== undefined ? ret :
    (ret = Store.renderScene.call(this, scene))   !== undefined ? ret :
    (ret = Wall.renderScene.call(this, scene))    !== undefined ? ret :
    (ret = Home.renderScene.call(this, scene))    !== undefined ? ret :
    <FiveThirty />

  return ret
}

