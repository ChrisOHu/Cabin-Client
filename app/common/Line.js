import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import {
  NbComponent,
  H1, H2, H3,
  View as NbView,
  Text as NbText
} from 'native-base'

export default class Line extends NbComponent {
  static propTypes = {
    style: T.object,
    title: T.string,
    theme: T.object
  }

  constructor(props) {
    super(props)
  }

  render() {
    const theme = this.getTheme()
    const {style, title} = this.props

    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            borderTopWidth: 1,
            borderTopColor: theme.lineColor,
            paddingTop: 5,
            paddingLeft: 5,
            marginBottom: 5
          },
          style
        ]}
      >
        <H3 style={{flex: 1}} theme={theme} >{title}</H3>
      </View>
    )
  }
}

