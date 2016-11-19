import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'

import {
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

import { KeyboardAwareScrollView } from '~/app/common/KeyboardAwareViews'
import ParallaxScrollView from '~/app/common/ParallaxScrollView'
import LoadingView from '~/app/common/LoadingView'

import {
  register,
  login,
  logout
} from '~/app/actions/users'

const window = Dimensions.get('window')

// import Button from './components/Button'
// import AutoComplete from './components/AutoComplete'

class Login extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    user: T.shape({
      isRegistering: T.bool,
      isLoggingIn: T.bool,
      isLoggingOut: T.bool,
      isLoggedIn: T.bool,
      user: T.object
    }).isRequired,
    register: T.func.isRequired,
    login: T.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      phone: '',
      name: '',
      password: '',
      phoneErrorMsg: '',
      nameErrorMsg: '',
      pwdErrorMsg: '',
      intent: 'login'
    };
  }

  componentWillMount () {
  }

  componentWillReceiveProps(nextProps) { }

  render() {
    const { theme, user } = this.props
    const { intent } = this.state

    let btnName     = intent == 'login' ? t('login') : t('register')
    let optionText  = intent == 'login' ? t('dontHaveAccount') : t('haveAnAccount')

    return (
      <NbView theme={theme} style={[styles.content, { padding: theme.contentPadding, backgroundColor: theme.sceneBgColor }]} >

        <View style={[styles.topImg, { backgroundColor: theme.sceneBgColor }]} >
          <Text style={{color: 'skyblue', lineHeight: 40, fontSize: 36, fontWeight: 'bold'}}>{`</>`}</Text>
        </View>

        <InputGroup borderType="underline" error={!!this.state.phoneErrorMsg} >
          <Icon name="ios-call" style={{color: 'black'}} /> 
          <Input ref="inputPhone"
            placeholder={this.state.phoneErrorMsg || 'Phone'} returnKeyType="next"
            onSubmitEditing={() => {
              const nextInputRef = this.state.intent == 'register' ? this.refs.inputName : this.refs.inputPassword
              nextInputRef.focus()
            }}
            onChangeText={(phone) => this.setState({phone})}
          />
        </InputGroup>

        {this._renderNameInput()}

        <InputGroup borderType="underline"
          style={{
            marginBottom: 50
          }}
        >
          <Icon name="ios-eye" style={{color: 'black'}} /> 
          <Input ref="inputPassword" error={!!this.state.pwdErrorMsg}
            placeholder={this.state.pwdErrorMsg || "Password"} secureTextEntry={true} returnKeyType="done"
            onChangeText={(password) => this.setState({password})}
            onSubmitEditing={this._loginOrRegister.bind(this)}
          />
        </InputGroup>

        <Button block rounded onPress={this._loginOrRegister.bind(this)} > {btnName} </Button>
        <View style={styles.moreOptions} >
          <TouchableWithoutFeedback onPress={
            () => {
              let intent = this.state.intent == 'login' ? 'register' : 'login'
              this.setState({intent})
            }
          } >
            <View>
              <Text style={styles.optionText} >{optionText}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <LoadingView visible={user.isRegistering || user.isLoggingIn} />

      </NbView>
    )
  }

  _renderNameInput() {
    if (this.state.intent == 'register') {
      return (
        <InputGroup borderType="underline" error={!!this.state.nameErrorMsg} >
          <Icon name="ios-call" style={{color: 'black'}} /> 
          <Input ref="inputName"
            placeholder={this.state.nameErrorMsg || 'Name'} returnKeyType="next"
            onSubmitEditing={() => this.refs.inputPassword.focus()}
            onChangeText={(name) => this.setState({name})}
          />
        </InputGroup>
      )
    }
  }

  _validateInputs() {
    const { phone, name, password } = this.state

    if (!phone) {
      this.setState({phoneErrorMsg: t('phoneIsEmpty')})
    } else if (!password) {
      this.setState({pwdErrorMsg: t('pwdIsEmpty')})
    } else if (this.state.intent == 'register' && !name) {
      this.setState({nameErrorMsg: t('nameIsEmpty')})
    } else {
      this.setState({phoneErrorMsg: null, pwdErrorMsg: null})
      return true
    }
  }

  _loginOrRegister() {
    if (!this._validateInputs()) return

    const { register, login, logout, user } = this.props
    const { intent, phone, name, password } = this.state

    /** login/register success redirect will be handled in Navigator's componentWillReceiveProps */
    switch (intent) {
      case 'login':
        login({phone, password})
        break
      case 'register':
        register({phone, name, password})
        break
      default:
        console.error(`unknown intent: ${intent}`)
        break
    }
  }

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center'
  },
  topImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width,
    height: 150
  },
  moreOptions: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  optionText: {
    fontSize: 12,
    color: 'grey'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    register   : ({phone, password}) => dispatch(register({phone, password})),
    login      : ({phone, password}) => dispatch(login({phone, password})),
    logout     : () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

