import React, {
  Component,
  PropTypes
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NavigationExperimental
} from 'react-native'

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base'

import { connect } from 'react-redux'

import CabinFab from './components/CabinFab'
import { renderHeader, renderScene } from './components/navigations'

import {
  push, pop, naviToLaunch, naviToHome, naviToTab
} from './actions/navigations'
import { utils as naviUtils } from './reducers/navigations'

const {
  Card: NavigationCard,
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
  StateUtils: NavigationStateUtils,
  Transitioner: NavigationTransitioner
} = NavigationExperimental

class Navigator extends Component {
  static propTypes = {
    navi: PropTypes.shape({
      app      : NavigationPropTypes.navigationState.isRequired,
      launch   : NavigationPropTypes.navigationState.isRequired,
      home     : NavigationPropTypes.navigationState.isRequired,
      homes    : NavigationPropTypes.navigationState.isRequired,
      painters : NavigationPropTypes.navigationState.isRequired,
      wall     : NavigationPropTypes.navigationState.isRequired
    }).isRequired,
    push         : PropTypes.func.isRequired,
    pop          : PropTypes.func.isRequired,
    naviToLaunch : PropTypes.func.isRequired,
    naviToHome   : PropTypes.func.isRequired,
    naviToTab    : PropTypes.func.isRequired,
    theme        : PropTypes.object.isRequired
  }
  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'homes'
    }
  }

  render() {
    const { navi, theme } = this.props;
    const routesKey = naviUtils.getCurrentRoutesStackKey(navi)
    const routes = navi[routesKey]

    let showTabBar = navi.app.index > 0

    return (
      <View style={{flex: 1, backgroundColor: theme.sceneBgColor}}>

        <NavigationCardStack
          style={{flex: 1}}
          key={'stack_' + routesKey}
          onNavigateBack={this.props.pop}
          navigationState={routes}
          renderHeader={this._renderHeader.bind(this)}
          renderScene={this._renderScene.bind(this)}
        />

        {this._renderTabBar()}

        <CabinFab />

      </View>
    );
  }

  _renderTabBar() {
    if (this.props.navi.app.index == 1) {
      return (
        <Footer>
          <FooterTab>
            <Button active={this.state.activeTab == 'homes'}    onPress={() => this._switchToTab('homes')} >
              Homes
              <Icon name="ios-images-outline" />
            </Button>
            <Button active={this.state.activeTab == 'painters'} onPress={() => this._switchToTab('painters')} >
              Painters
              <Icon name="ios-color-palette-outline" />
            </Button>
            <Button active={this.state.activeTab == 'wall'}       onPress={() => this._switchToTab('wall')} >
              Wall
              <Icon name="ios-paw-outline" />
            </Button>
          </FooterTab>
        </Footer>
      )
    } else {
      return null
    }
  }

  /** sceneProps is of SceneRendererProps:
   *
   * const scene = PropTypes.shape({
   *   index: PropTypes.number.isRequired,
   *   isActive: PropTypes.bool.isRequired,
   *   isStale: PropTypes.bool.isRequired,
   *   key: PropTypes.string.isRequired,
   *   route: navigationRoute.isRequired,
   * });
   * const SceneRendererProps = {
   *   layout: layout.isRequired,
   *   navigationState: navigationState.isRequired,
   *   position: animatedValue.isRequired,
   *   progress: animatedValue.isRequired,
   *   scene: scene.isRequired,
   *   scenes: PropTypes.arrayOf(scene).isRequired,
   * };
   */
  _renderHeader(sceneProps) {
    return renderHeader.call(this, sceneProps.scene)
  }
  _renderScene(sceneProps) {
    return renderScene.call(this, sceneProps.scene)
  }
  _switchToTab(key) {
    this.props.naviToTab({
      route: {key: key}
    })
    this.setState({activeTab: key})
  }
}

const styles = StyleSheet.create({ })

const mapStateToProps = (state, ownProps) => {
  return {
    navi: state.navigations,
    theme: state.theme
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    push         : ({route, ...params}) => dispatch(push({route, ...params})),
    pop          : () => dispatch(pop()),
    naviToLaunch : () => dispatch(naviToLaunch()),
    naviToHome   : () => dispatch(naviToHome()),
    naviToTab    : ({route, ...params}) => dispatch(naviToTab({route, ...params}))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigator)

