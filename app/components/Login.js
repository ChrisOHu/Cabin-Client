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

import {
  naviToHome
} from '~/app/actions/navigations'
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
      user: T.object,
      error: T.object
    }).isRequired,
    naviToHome: T.func.isRequired,
    register: T.func.isRequired,
    login: T.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      phone: '',
      password: '',
      visibleHeight: Dimensions.get('window').height,
      scroll: false,
      intent: 'login'
    };
  }

  componentWillMount () {
  }

  render() {
    const { theme } = this.props
    const { intent } = this.state

    let btnName     = intent == 'login' ? t('login') : t('register')
    let optionText  = intent == 'login' ? t('dontHaveAccount') : t('haveAnAccount')

    return (
      <ParallaxScrollView
        style={styles.root}
        contentContainerStyle={[{flex: 1, backgroundColor: theme.sceneBgColor }]} 
        backgroundColor="transparent"
        renderScrollComponent={ props => <KeyboardAwareScrollView {...props} /> }
        renderBackground={() => {
          {/*return <Image source={require('./assets/logo.png')} resizeMode='contain' style={styles.logo} />*/}
          return (
            <View style={[styles.header, { backgroundColor: theme.sceneBgColor }]} >
              <Text style={{color: 'skyblue', lineHeight: 40, fontSize: 36, fontWeight: 'bold'}}>{`</>`}</Text>
            </View>
          )
        }}
        renderForeground={() => null}
        parallaxHeaderHeight={200} >

        <NbView theme={theme} style={[styles.content, { padding: theme.contentPadding, backgroundColor: theme.sceneBgColor }]} >
          <InputGroup borderType="underline" error={!!this.state.phoneErrorMsg} >
            <Icon name="ios-call" style={{color: 'black'}} /> 
            <Input ref="inputPhone"
              placeholder={this.state.phoneErrorMsg || 'Phone'} returnKeyType="next"
              onSubmitEditing={() => this.refs.inputPassword.focus()}
              onChangeText={(phone) => this.setState({phone})}
            />
          </InputGroup>
          <InputGroup borderType="underline"
            style={{
              marginBottom: 50
            }}
          >
            <Icon name="ios-eye" style={{color: 'black'}} /> 
            <Input ref="inputPassword" error={!!this.state.pwdErrorMsg}
              placeholder={this.state.pwdErrorMsg || "Password"} secureTextEntry={true} returnKeyType="done"
              onChangeText={(password) => this.setState({password})}
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
        </NbView>

      </ParallaxScrollView>
    )
  }

  _validateInputs() {
    const { phone, password } = this.state

    if (!phone) {
      this.setState({phoneErrorMsg: t('phoneIsEmpty')})
    } else if (!password) {
      this.setState({pwdErrorMsg: t('pwdIsEmpty')})
    } else {
      this.setState({phoneErrorMsg: null, pwdErrorMsg: null})
      return true
    }
  }

  _loginOrRegister() {
    if (!this._validateInputs()) return

    const { register, login, logout, naviToHome, user } = this.props
    const { intent, phone, password } = this.state

    switch (intent) {
      case 'login':
        login({phone, password})
        break
      case 'register':
        register({phone, password})
        break
      default:
        console.error(`unknown intent: ${intent}`)
        break
    }
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width,
    height: 200
  },
  content: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 20,
    height: window.height - 200,
    alignItems: 'center'
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
    naviToHome : () => dispatch(naviToHome()),
    register   : ({phone, password}) => dispatch(register({phone, password})),
    login      : ({phone, password}) => dispatch(login({phone, password})),
    logout     : () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

