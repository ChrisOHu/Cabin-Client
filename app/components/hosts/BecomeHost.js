import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import {
  View as NbView,
  Button
} from 'native-base'
import { connect } from 'react-redux'
import t from 'counterpart'

import { becomeHost } from '~/app/actions/hosts'

class BecomeHost extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    user: T.object.isRequired,
    hosts: T.object.isRequired,
    becomeHost: T.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { theme, user, becomeHost } = this.props
    const userSnapshot = {
      userId: user._id,
      name: user.name,
      avatar: user.avatar,
      banner: user.banner
    }

    return (
      <NbView theme={theme} style={styles.content} >
        <Button style={{alignSelf: 'center'}} onPress={() => becomeHost(userSnapshot)} >{t('becomeHost')}</Button>
      </NbView>
    )
  }

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme,
    user: state.users.user,
    hosts: state.hosts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    becomeHost: ({userId, name, avatar, banner}) => dispatch(becomeHost({userId, name, avatar, banner}))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BecomeHost)


