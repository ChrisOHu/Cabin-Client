import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
import {
  View as NbView,
  Content,
  Button,
  Icon,
  H3,
  InputGroup,
  Input
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
import ImagePicker from 'react-native-image-crop-picker'
import {
  PicturesGrid,
  Lightbox,
  PlusButton,
  AutogrowInput
} from '~/app/common'
import Events from '~/app/Events'

import { connect } from 'react-redux'
import t from 'counterpart'

import { push, pop } from '~/app/actions/navigations'
import { postHome } from '~/app/actions/homes'
import { showToast } from '~/app/actions/app'

const window = Dimensions.get('window')
class PostHome extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    user: T.object.isRequired,
    pop: T.func.isRequired,
    postHome: T.func.isRequired,
    showToast: T.func.isRequired
  }
  static events = {
    pop: function () {
      console.debug('TODO: add user confirm ')
      this.props.pop()
    },
    post: function() {
      this._postNewHome()
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      homeFormData: null,
      pictures: [],
      bannerPicture: null,
      descriptions: ""
    }
  }

  componentDidMount() {
    const eventHandlers = PostHome.events
    const eventNames = Object.keys(PostHome.events)
    eventNames.forEach((name) => {
      Events.on(`cabin/post-home/${name}`, (eventHandlers[name]).bind(this))
    })
  }
  componentWillUnmount() {
    const eventHandlers = PostHome.events
    const eventNames = Object.keys(PostHome.events)
    eventNames.forEach((name) => {
      Events.removeAllListeners(`cabin/post-home/${name}`)
    })
  }

  render() {
    const { theme, user, postHome } = this.props

    return (
      <Content theme={theme} style={styles.content}
        contentContainerStyle={styles.contentContainerStyle} >
        <Form
          ref='homeForm'
          onFocus={(e, component) => {}}
          onChange={(formData) => { this.setState({homeFormData: formData}) }}
        >
          <Separator />
          <InputField ref='name'     label={t('name')} value={null} editable={true} />
          <InputField ref='location' label={t('location')} />
          <Separator />
          <InputField ref='price'    label={t('price')} />
          <InputField ref='rooms'    label={t('rooms')} />
        </Form>
        <H3 style={styles.title}>{t('pictures')}</H3>
        <PicturesGrid editable theme={theme} />
        <H3 style={styles.title}>{t('bannerPicture')}</H3>
        {this._renderBannerPicture()}
        <H3 style={styles.title}>{t('tellUsAboutYourHome')}</H3>
        <AutogrowInput style={styles.aboutHome} returnKeyType="done"
          onSubmitEditing={ (event) => this.setState({descriptions: event.nativeEvent.text}) }
        />
      </Content>
    )
  }

  _renderBannerPicture() {
    const PLUS_SIZE = (window.width - 10 * 4) / 3
    return this.state.bannerPicture ?
      (
        <Lightbox
          rightBtns={(close) => (
            <Button transparent textStyle={{color: 'white'}}
              onPress={() => {
                ImagePicker.openPicker({
                  multiple: false
                }).then(image => {
                  this.setState({bannerPicture: image.path})
                })
              }}
            >
              {t('change')}
            </Button>
          )}
          content={(
            <Image style={{width: window.width, height: window.height, backgroundColor: 'rgba(0,0,0,0)'}}
              source={{ uri: this.state.bannerPicture }}
              resizeMode='center'
            />
          )}
        >
          <Image style={styles.bannerPicture} source={{uri: this.state.bannerPicture}} resizeMode="cover" />
        </Lightbox>
      ) :
      (
        <PlusButton size={PLUS_SIZE}
          style={{marginLeft: 10, marginBottom: 10}}
          onPress={() => {
            ImagePicker.openPicker({
              multiple: false
            }).then(image => {
              this.setState({bannerPicture: image.path})
            })
          }}
        />
      )
  }

  _postNewHome() {
    const { user, pop, postHome, showToast } = this.props
    const { homeFormData, pictures, bannerPicture, descriptions } = this.state
    const { name, location, price, rooms } = homeFormData

    if (!name || !location || !price || !rooms) {
      showToast({message: t('missingFields')})
    }

    const newHome = {
      userId: user._id,
      name: name,
      geolocation: { // TODO: geolocation
        latlng: { latitude: 12.25, longitude: 12.25 },
        location: { country: 'China', city: 'Shanghai', address: location }
      },
      price,
      rooms,
      pictures,
      banner: bannerPicture,
      descriptions
    }

    this.props.postHome(
      newHome,
      (data)  => { showToast({message: t('success')}); pop() },
      (error) => { showToast({message: t('opsError')}) }
    )
  }

}

const styles = StyleSheet.create({
  content: {},
  contentContainerStyle: {
    padding: 0
  },
  title: {
    margin: 10
  },
  bannerPicture: {
    width: window.width - 20,
    marginHorizontal: 10,
    height: (window.width - 20) * 0.618
  },
  aboutHome: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    margin: 10
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
    postHome: (newHome, onSuccess, onError) => dispatch(postHome(newHome, onSuccess, onError)),
    showToast: ({message}) => dispatch(showToast({message})),
    pop : () => dispatch(pop())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHome)

