import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import {
  H1, H2, H3,
  Header,
  Title,
  View as NbView,
  Text as NbText,
  Button,
  Icon,
  InputGroup,
  Input
} from 'native-base'
import { connect } from 'react-redux'
import t from 'counterpart'

import ParallaxScrollView from '~/app/common/ParallaxScrollView'
import { KeyboardAwareScrollView } from '~/app/common/KeyboardAwareViews'
import UserCard from '~/app/common/UserCard'
import { Line } from '~/app/common'
import {
  push
} from '~/app/actions/navigations'

const window = Dimensions.get('window')

class Wall extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    user: T.shape({
      _id: T.string,
      phone: T.string,
      name: T.string,
      email: T.string,
      avatar: T.string,
      banner: T.string,
      geolocation: T.string,
      profession: T.string,
      followers: T.arrayOf(T.string),
      followings: T.arrayOf(T.string),
      favoriteHomes: T.arrayOf(T.string),
      favoriteDesigns: T.arrayOf(T.string),
      preferences: T.object,
      rules: T.arrayOf(T.string),
      hostId: T.string,
      designerId: T.string,

      createdAt: T.string,
      updatedAt: T.string
    }).isRequired,
    push: T.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { theme, push } = this.props
    const user = this.props.user

    if (!user) {
      return null
    }

    const HEADER_HEIGHT = 300
    return (
      <ParallaxScrollView
        style={{ flex: 1, backgroundColor: theme.sceneBgColor, overflow: 'hidden' }}
        contentContainerStyle={{ flex: 1, backgroundColor: theme.sceneBgColor }}
        backgroundColor="transparent"
        renderScrollComponent={ props => <KeyboardAwareScrollView {...props} /> }
        parallaxHeaderHeight={HEADER_HEIGHT} 
        renderBackground={() => {
          return (
            <Image
              defaultSource={require('~/app/assets/header-default.jpg')}
              source={{ uri: user.banner }}
              resizeMode='cover'
              style={{ width: window.width, height: HEADER_HEIGHT }}
            />
          )
        }}
        renderForeground={() => {
          const userCard = { avatar: user.avatar, name: user.name, meta: user.profession }
          return (
            <View style={{ height: HEADER_HEIGHT, flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
              <UserCard user={userCard} onPress={() => {
                push({route: {key: 'my-profile'}})
              }} />
            </View>
          )
        }}
        stickyHeaderHeight={theme.toolbarHeight}
        renderStickyHeader={() => {
          return (
            <Header theme={theme} >
              <Button transparent>
                <Image
                  defaultSource={require('~/app/assets/avatar-default.png')}
                  source={{ uri: user.avatar }}
                  resizeMode='cover'
                  style={{ width: 35, height: 35, borderRadius: 17.5 }}
                />
              </Button>
   
              <Title>{user.name}</Title>
   
              <Button transparent>
                <Icon name="ios-cog" />
              </Button>
            </Header>
          )
        }}
      >

      <NbView theme={theme} style={[styles.content, {
        backgroundColor: theme.sceneBgColor,
        padding: theme.contentPadding,
        paddingTop: 15
      }]} >
          <Line title={t('Favorites')} />
      </NbView>

      </ParallaxScrollView>
    );
  }

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 15
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme,
    user: state.users.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    push : ({route, ...params}) => dispatch(push({route, ...params})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wall)

