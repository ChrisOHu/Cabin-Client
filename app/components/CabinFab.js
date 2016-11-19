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
import { connect } from 'react-redux'

import ActionButton from '../common/ActionButton'
import {
  push, pop, naviToLaunch, naviToHome, naviToTab
} from '../actions/navigations'
import { logout } from '../actions/users'

class CabinFab extends Component {
  static propTypes = {
    rules: T.array, // of ['host', 'designer']
    naviToLaunch: T.func.isRequired,
    logout: T.func.isRequired
  }
  static defaultProps = {
    rules: []
  }

  _getActions() {
    let ret = []
    const { rules } = this.props

    /**
     * All Actions (will only be available when rules met):
     * • Become A Host
     * • Become A Designer
     * • Post A Home
     * • Post A Design
     * • Login
     */
    if (rules.indexOf('host') < 0) {
      ret.push(
        <ActionButton.Item key="cabinFabItem-becomeHost" buttonColor='crimson' title={t('becomeHost')} onPress={() => {}}>
          <Icon name="ios-ribbon" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )
    }
    if (rules.indexOf('designer') < 0) {
      ret.push(
        <ActionButton.Item key="cabinFabItem-becomePainter" buttonColor='royalblue' title={t('becomePainter')} onPress={() => {}}>
          <Icon name="ios-color-palette" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )
    }

    ret.push(
        <ActionButton.Item key="cabinFabItem-postHome" buttonColor='forestgreen' title={t('postHome')} onPress={() => {}}>
          <Icon name="ios-home" style={styles.actionButtonIcon} />
        </ActionButton.Item>
    )
    ret.push(
        <ActionButton.Item key="cabinFabItem-postDesign" buttonColor='#ff00ff' title={t('postDesign')} onPress={() => {}}>
          <Icon name="md-bulb" style={styles.actionButtonIcon} />
        </ActionButton.Item>
    )

    ret.push(
        <ActionButton.Item key="cabinFabItem-logout" buttonColor='#87ceeb' title={t('logout')} onPress={() => this.props.logout()}>
          <Icon name="ios-paw" style={styles.actionButtonIcon} />
        </ActionButton.Item>
    )

    return ret
  }

  render() {
    const {
      rules,
      ...rest
    } = this.props

    return (
      <ActionButton buttonColor="#87ceeb"
        position="left"
        size={42}
        spacing={10}
        offsetX={20}
        offsetY={50}
        {...rest} >

        { this._getActions() }

      </ActionButton>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    naviToLaunch : () => dispatch(naviToLaunch()),
    logout : () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CabinFab)


