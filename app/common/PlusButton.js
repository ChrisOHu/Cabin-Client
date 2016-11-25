import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import {
  NbComponent,
} from 'native-base'

const window = Dimensions.get('window')
export default class PlusButton extends NbComponent {
  static propTypes = {
    style: T.object,
    theme: T.object,
    size: T.number,
    onPress: T.func
  }
  static defaultProps = {
    size: 100
  }

  constructor(props) {
    super(props)
  }

  render() {
    const theme = this.getTheme()
    const {size, style, onPress} = this.props

    return (
      <TouchableOpacity onPress={onPress} >
        <View style={[styles.plusBtnContainer, {width: size, height: size}, style]} >
          <View style={styles.plusBtn} >
            <View style={[styles.hLine, {width: 0.6 * size}]} />
            <View style={[styles.vLine, {width: 0.6 * size}]} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  plusBtnContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: '#B8E986'
  },
  plusBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hLine: {
    height: 1,
    backgroundColor: '#4A90E2'
  },
  vLine: {
    height: 1,
    backgroundColor: '#4A90E2',
    transform: [
      {rotate: '90deg'}
    ]
  }
})

