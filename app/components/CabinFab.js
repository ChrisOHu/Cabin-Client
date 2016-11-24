import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import t from 'counterpart'
import Icon from 'react-native-vector-icons/Ionicons'

import ActionButton from '../common/ActionButton'
import {
  push, pop, naviToLaunch, naviToHome, naviToTab
} from '../actions/navigations'

class CabinFab extends Component {
  static propTypes = {
    push: T.func.isRequired,
    pop: T.func.isRequired,
    naviToLaunch: T.func.isRequired,
    logout: T.func.isRequired
  }

  render() {

    return (
      <ActionButton buttonColor="#87ceeb"
        position="left"
        size={42}
        spacing={10}
        offsetX={20}
        offsetY={50}
      >

        { this._getActions() }

      </ActionButton>
    )
  }

  _getActions() {
    let ret = []
    const { push, pop, naviToLaunch, logout, users, hosts, designers } = this.props
    const user = users.user
    const host = hosts.host
    const designer = designers.designer

    if (!(host && host.userId == user._id)) {
      ret.push(
        <ActionButton.Item key="cabinFabItem-becomeHost" buttonColor='crimson' title={t('becomeHost')}
          onPress={() => push({route: {key: "become-host"}})}
        >
          <Icon name="ios-ribbon" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )
    } else {
      ret.push(
        <ActionButton.Item key="cabinFabItem-switchToHost" buttonColor='crimson' title={t('switchToHost')}
          onPress={() => push({route: {key: "host"}})}
        >
          <Icon name="ios-ribbon" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )
    }
    if (!(designer && designer.userId == user._id)) {
      ret.push(
        <ActionButton.Item key="cabinFabItem-becomeDesigner" buttonColor='royalblue' title={t('becomeDesigner')}
          onPress={() => push({route: {key: "become-designer"}})}
        >
          <Icon name="ios-color-palette" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )
    } else {
      ret.push(
        <ActionButton.Item key="cabinFabItem-switchToDesigner" buttonColor='royalblue' title={t('switchToDesigner')}
          onPress={() => push({route: {key: "designer"}})}
        >
          <Icon name="ios-color-palette" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )
    }

    ret.push(
      <ActionButton.Item key="cabinFabItem-postHome" buttonColor='forestgreen' title={t('postHome')}
        onPress={() => push({route: {key: "post-home"}})}
      >
          <Icon name="ios-home" style={styles.actionButtonIcon} />
        </ActionButton.Item>
    )
    ret.push(
      <ActionButton.Item key="cabinFabItem-postDesign" buttonColor='#ff00ff' title={t('postDesign')}
        onPress={() => push({route: {key: "post-design"}})}
      >
          <Icon name="md-bulb" style={styles.actionButtonIcon} />
        </ActionButton.Item>
    )

    ret.push(
      <ActionButton.Item key="cabinFabItem-logout" buttonColor='#87ceeb' title={t('logout')}
        onPress={() => logout()}
      >
          <Icon name="ios-paw" style={styles.actionButtonIcon} />
        </ActionButton.Item>
    )

    return ret
  }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
});

export default CabinFab


