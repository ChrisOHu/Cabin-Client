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

import { becomeDesigner } from '~/app/actions/designers'

class BecomeDesigner extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    user: T.object.isRequired,
    designers: T.object.isRequired,
    becomeDesigner: T.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { theme, user, becomeDesigner } = this.props
    const designer = {
      userId: user._id
    }

    return (
      <NbView theme={theme} style={styles.content} >
        <Button style={{alignSelf: 'center'}} onPress={() => becomeDesigner(designer)} >{t('becomeDesigner')}</Button>
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
    designers: state.designers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    becomeDesigner: (designer) => dispatch(becomeDesigner(designer))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BecomeDesigner)


