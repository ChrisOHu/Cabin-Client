import React, {
  PropTypes as T,
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import {
  Header,
  Title,
  View as NbView,
  Text as NbText,
  Button,
  Icon as NbIcon,
  InputGroup,
  Input,
  Content
} from 'native-base'
import {
  Form,
  Separator,
  InputField,
  LinkField,
  SwitchField,
  PickerField,
  DatePickerField,
  TimePickerField
} from 'react-native-form-generator'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Lightbox from 'react-native-lightbox'
import ImagePicker from 'react-native-image-crop-picker'
import t from 'counterpart'
import { connect } from 'react-redux'

import { KeyboardAwareScrollView } from '~/app/common/KeyboardAwareViews'
import Events from '~/app/Events'
import { renderLightbox } from '~/app/common'
import {
  push, pop
} from '~/app/actions/navigations'
import {
  patchUserProfile,
  updateUserBanner,
  updateUserAvatar
} from '~/app/actions/users'

const window = Dimensions.get('window')

class MyProfile extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    user: T.object.isRequired,
    isUpdating: T.bool.isRequired,
    error: T.any,

    push: T.func.isRequired,
    pop: T.func.isRequired,
    patchUserProfile: T.func.isRequired,
    updateUserBanner: T.func.isRequired,
    updateUserAvatar: T.func.isRequired
  }

  static events = {
    pop: function () {
      console.debug('TODO: add user confirm ')
      this.props.pop()
    },
    save: function() {
      this._updateProfile()
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      profileFormData: null
    }
  }

  componentDidMount() {
    const eventHandlers = MyProfile.events
    const eventNames = Object.keys(MyProfile.events)
    eventNames.forEach((name) => {
      Events.on(`cabin/my-profile/${name}`, (eventHandlers[name]).bind(this))
    })
  }
  componentWillUnmount() {
    const eventHandlers = MyProfile.events
    const eventNames = Object.keys(MyProfile.events)
    eventNames.forEach((name) => {
      Events.removeAllListeners(`cabin/my-profile/${name}`)
    })
  }

  render() {
    const { theme, user, isUpdating, error, updateUserBanner, updateUserAvatar } = this.props

    if (!user) {
      return null
    }

    return (
      <Content style={styles.content} theme={theme} >

        {renderLightbox({
          rightBtns: (
            <Button transparent textStyle={{color: 'white'}}
              onPress={() => {
                ImagePicker.openPicker({
                  cropping: false
                }).then(image => {
                  const {path, width, height, mime, size, data} = image
                  updateUserBanner(user._id, image)
                })
              }}
            >
              {t('change')}
            </Button>
          ),
          child: (
            <Image style={styles.banner}
              defaultSource={require('~/app/assets/header-default.jpg')}
              source={{ uri: user.banner }}
              resizeMode='cover'
            />
          )
        })}

        {renderLightbox({
          rightBtns: (
            <Button transparent textStyle={{color: 'white'}}
              onPress={() => {
                ImagePicker.openPicker({
                  width: 600,
                  height: 600,
                  cropping: true
                }).then(image => {
                  const {path, width, height, mime, size, data} = image
                  updateUserAvatar(user._id, image)
                })
              }}
            >
              {t('change')}
            </Button>
          ),
          child: (
            <View style={styles.avatarContainer} >
              <Image style={styles.avatar}
                defaultSource={require('~/app/assets/avatar-default.png')}
                source={{ uri: user.avatar }}
                resizeMode='cover'
              />
              <View style={styles.avatarRight} >
                <Text style={{fontSize: 18, paddingRight: 8, paddingBottom: 2, color: '#4A4A4A'}} >{t('edit')}</Text>
                <Ionicons name="ios-arrow-forward" color="#4A4A4A" size={20} />
              </View>
            </View>
          ),
          content: (
            <Image style={{width: window.width, height: window.width}}
              defaultSource={require('~/app/assets/avatar-default.png')}
              source={{ uri: user.avatar }}
              resizeMode='center'
            />
          )
        })}

        <Form
          ref='registrationForm'
          onFocus={(e, component) => {}}
          onChange={(formData) => { this.setState({profileFormData: formData}) }}
          label="Profile" >
          <Separator />
          <InputField ref='phone' editable={false}
            value={user.phone}
            keyboardType='numeric' />
          <InputField ref='name'  value={user.name} placeholder={t('editName')} />
        </Form>

      </Content>
    )
  }

  _updateProfile() {
    const user = this.props.user
    const { profileFormData } = this.state

    if (!profileFormData || Object.keys(profileFormData).length == 0) {
      return
    }

    this.props.patchUserProfile(user._id, profileFormData)
  }
}

const styles = StyleSheet.create({
  content: {},
  banner: {
    width: window.width,
    height: 200,
    marginBottom: 10
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 70,
    paddingLeft: 10,
    paddingRight: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  avatarRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme,
    user: state.users.user,
    isUpdating: state.users.isUpdating,
    error: state.users.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    push: ({route, ...params}) => dispatch(push({route, ...params})),
    pop : () => dispatch(pop()),
    patchUserProfile: (userId, profileData) => dispatch(patchUserProfile(userId, profileData)),
    updateUserBanner: (userId, image) => dispatch(updateUserBanner(userId, image)),
    updateUserAvatar: (userId, image) => dispatch(updateUserAvatar(userId, image))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile)

