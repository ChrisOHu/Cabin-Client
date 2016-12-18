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
import t from 'counterpart'

import Toast, {DURATION} from '~/app/common/Toast'
import CabinFab from './components/CabinFab'
import { renderHeader, renderScene } from './components/navigations'

import { logout } from './actions/users'
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
    app: PropTypes.shape({
      toast: PropTypes.shape({
        message: PropTypes.string,
        duration: PropTypes.number
      })
    }),
    navi         : PropTypes.object.isRequired,
    users        : PropTypes.object,
    hosts        : PropTypes.object.isRequired,
    designers    : PropTypes.object.isRequired,
    homes        : PropTypes.object.isRequired,
    designs      : PropTypes.object.isRequired,
    push         : PropTypes.func.isRequired,
    pop          : PropTypes.func.isRequired,
    naviToLaunch : PropTypes.func.isRequired,
    naviToHome   : PropTypes.func.isRequired,
    naviToTab    : PropTypes.func.isRequired,
    logout       : PropTypes.func.isRequired,
    theme        : PropTypes.object.isRequired
  }
  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'design'
    }
  }

  /**
   * " React may call this method even if the props have not changed,
   *   so make sure to compare the current and next values if you only want to handle changes. "
   */
  componentWillReceiveProps(nextProps) {}

  render() {

    const { app, navi, theme } = this.props;
    const { toast } = app
    const routesKey = naviUtils.getCurrentRoutesStackKey(navi)
    const routes = navi[routesKey]

    let showTabBar = navi.app.index > 0
    let showFab = navi.app.index > 0

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

        {this._renderFab()}

        <Toast ref="toast" message={toast.message} duration={toast.duration || DURATION.LENGTH_SHORT} />

      </View>
    );
  }

  _renderTabBar() {
    if (this.props.navi.app.index == 1) {
      return (
        <Footer>
          <FooterTab>
            <Button active={this.state.activeTab == 'design'}  onPress={() => this._switchToTab('design')} >
              Design
              <Icon name="ios-color-palette-outline" />
            </Button>
            <Button active={this.state.activeTab == 'explore'} onPress={() => this._switchToTab('explore')} >
              Explore
              <Icon name="ios-compass" />
            </Button>
            <Button active={this.state.activeTab == 'store'}   onPress={() => this._switchToTab('store')} >
              Store
              <Icon name="ios-cart" />
            </Button>
            <Button active={this.state.activeTab == 'wall'}    onPress={() => this._switchToTab('wall')} >
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
  _renderFab() {
    if (this.props.navi.app.index == 1) {
      return (
        <CabinFab {...this.props} />
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
    app: state.app,
    navi: state.navigations,
    theme: state.theme,
    users: state.users,
    hosts: state.hosts,
    designers: state.designers,
    homes: state.homes,
    designs: state.designs
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    push         : ({route, ...params}) => dispatch(push({route, ...params})),
    pop          : () => dispatch(pop()),
    naviToLaunch : () => dispatch(naviToLaunch()),
    naviToHome   : () => dispatch(naviToHome()),
    naviToTab    : ({route, ...params}) => dispatch(naviToTab({route, ...params})),
    logout       : () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigator)

