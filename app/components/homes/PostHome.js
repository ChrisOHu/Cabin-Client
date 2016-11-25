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
  PlusButton
} from '~/app/common'

import { connect } from 'react-redux'
import t from 'counterpart'

import { postHome } from '~/app/actions/homes'

const window = Dimensions.get('window')
class PostHome extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    user: T.object.isRequired,
    host: T.object.isRequired,
    postHome: T.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      homeFormData: null,
      pictures: [],
      bannerPicture: null
    }
  }

  render() {
    const { theme, user, host, postHome } = this.props

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
        <InputGroup borderType='underline' >
          <Input multiline={true} />
        </InputGroup>
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
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme,
    user: state.users.user,
    host: state.hosts.host
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postHome: (newHome) => dispatch(postHome(newHome))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHome)

