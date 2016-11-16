import React, {
  PropTypes as T,
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from '~/app/common/KeyboardAwareViews'
import t from 'counterpart'
import { connect } from 'react-redux'

class MyProfile extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    user: T.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { theme } = this.props
    const user = this.props.user.data
    console.log(user)

    return (
      <Content style={styles.content} theme={theme} >

        <TouchableWithoutFeedback>
          <Image style={styles.banner}
            defaultSource={require('~/app/assets/header-default.jpg')}
            source={{ uri: user.banner }}
            resizeMode='cover'
          />
        </TouchableWithoutFeedback>

        <View style={styles.avatarContainer} >
          <Image style={styles.avatar}
            defaultSource={require('~/app/assets/avatar-default.png')}
            source={{ uri: user.avatar }}
            resizeMode='cover'
          />
          <Ionicons name="ios-arrow-forward" color="#696969" size={30} />
        </View>

        <Form
          ref='registrationForm'
          onFocus={(e, component) => {}}
          onChange={(fromData) => { console.debug(formData) }}
          label="Profile" >
          <Separator />
          <InputField ref='phone'
            value={user.phone}
            keyboardType='numeric' />
          <InputField ref='name'  value={user.name} placeholder={t('editName')} />
        </Form>

      </Content>
    )
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
    height: 90,
    paddingLeft: 10,
    paddingRight: 10
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 8
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile)

