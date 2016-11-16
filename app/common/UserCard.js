import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import t from 'counterpart'

class UserCard extends Component {
  static propTypes = {
    user: T.shape({
      avatar: T.string,
      name: T.string,
      meta: T.string
    }).isRequired,
    onPress: T.func
  }
  static defaultProps = {}

  constructor(props) {
    super(props)
  }

  render() {
    const { user } = this.props
    const name = user.name || t('edit')
    const styles = this.getStyles()

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} >
        <View style={styles.container} >
          <View style={styles.content} >
            <Image style={styles.avatar}
              defaultSource={require('~/app/assets/avatar-default.png')}
              source={{ uri: user.avatar }}
              resizeMode='cover'
            />
            <Text style={styles.name} >{name}</Text>
            <Text style={styles.meta} >{user.meta}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  getStyles() {
    return {
      container: {
        height: 160
      },
      content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      avatar: {
        borderRadius: 50,
        width: 100,
        height: 100
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      meta: {
        fontSize: 14,
        color: 'white',
      }
    }
  }
}

export default UserCard

