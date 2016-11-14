import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

import Spinner from 'react-native-spinkit'

const window = Dimensions.get('window')

class LoadingView extends Component {
  static propTypes = {
    style: T.object,
    visible: T.bool,
    size: T.number,
    type: T.string,
    color: T.string
  }
  static defaultProps = {
    visible: false,
    text: 'taking you to the moon ...',
    size: 100,
    type: 'Circle',
    color: '#fffafa'
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      style, text, visible, size, color, type, ...rest
    } = this.props

    if (!visible) return null

    return (
      <View style={[styles.container, style]} >
        <Spinner style={styles.spinner}
          size={size}
          type={type}
          color={color}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.33)'
  },
  spinner: {
    alignSelf: 'center',
    marginTop: 0.2 * window.height
  }
})

export default LoadingView
 
