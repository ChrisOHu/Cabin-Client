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

import { connect } from 'react-redux'
import t from 'counterpart'

import { postHome } from '~/app/actions/homes'

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
      homeFormData: null
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
      </Content>
    )
  }

}

const styles = StyleSheet.create({
  content: {},
  contentContainerStyle: {
    padding: 0
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

