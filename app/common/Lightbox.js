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
  Header,
  Button,
  Title,
  Icon as NbIcon
} from 'native-base' 
import _Lightbox from 'react-native-lightbox'

export default class Lightbox extends NbComponent {
  static propTypes = {
    theme: T.object,
    title: T.string,
    rightBtns: T.oneOfType([
      T.arrayOf(T.node), T.node
    ]),
    content: T.node
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {theme, title, rightBtns, content, children, ...rest} = this.props

    return (
      <_Lightbox
        renderHeader={(close) => (
          <Header theme={theme} style={{backgroundColor: 'transparent'}}>
            <Button transparent onPress={close} >
              <NbIcon name="ios-close" style={{fontSize: 30, color: 'white'}} />
            </Button>
            <Title style={{color: 'white'}} >{title}</Title>
            {rightBtns}
          </Header>
        )}
        renderContent={() => {
          return content || children
        }}
        {...rest}
      >
        {children}
      </_Lightbox>
    )
  }
}

