import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  Image,
  Platform,
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
import {
  Line,
  UserCard,
  ScrollableTabView
} from '~/app/common'
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
      homes: __MOCK.homes
    }
  }

  render() {
    const { theme, push } = this.props
    const user = this.props.user

    if (!user) {
      return null
    }

    const HEADER_HEIGHT = window.width / 1.2
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
              source={{/*uri: user.banner*/}}
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
            </Header>
          )
        }}
        renderFixedHeader={() => (
          <NbView theme={theme} style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            right: 0,
            top: 0,
            height: theme.toolbarHeight,
            paddingTop: (Platform.OS === 'ios' ) ? 15 : 0,
            paddingHorizontal: 0,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }} >
            <Button transparent style={{alignSelf: 'center', paddingRight: -3}} > <Icon name="ios-options-outline" /> </Button>
            <Button transparent style={{alignSelf: 'center', paddingRight: -1}}> <Icon name="ios-cog" /> </Button>
          </NbView>
        )}
      >

      <NbView theme={theme} style={[styles.content, {
        backgroundColor: theme.sceneBgColor,
        // padding: theme.contentPadding,
        paddingTop: 15
      }]} >
        <Line title={t('favorites')} />
        <ScrollableTabView>
          <View tabLabel="Homes"   style={{}} >
            {this.state.homes.map((home, i) => (
              <Image key={`home-${i}`} style={{width: window.width, height: 200, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginBottom: 1}}
                resizeMode="cover" source={home.banner} >
                <Image style={{width: 60, height: 60, marginBottom: 6}} source={home.avatar} />
                <Text style={{fontSize: 20, fontWeight: 'bold', backgroundColor: 'transparent', color: 'white', marginBottom: 10}} >{home.name}</Text>
                <View style={{paddingHorizontal: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                  <Text style={{fontSize: 16, backgroundColor: 'transparent', color: 'white'}}>{`${home.reviews} Reviews`}</Text>
                  <Text style={{fontSize: 16, backgroundColor: 'transparent', color: 'white'}}>{`${home.designs} designers`}</Text>
                </View>
              </Image>
            ))}
          </View>
          <View tabLabel="Designs" style={{height: 800, backgroundColor: 'lightgray'}} />
        </ScrollableTabView>
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


const __MOCK = {
  homes: [
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: '🏠',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-1.jpg')
    },
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: '🏠',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-2.jpg')
    },
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: '🏠',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-3.jpg')
    }
  ]
}


