import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  H1, H2, H3,
  Header,
  Title,
  View as NbView,
  Text as NbText,
  Button,
  Icon as NbIcon,
  InputGroup,
  Input,
  Content
} from 'native-base' 
import Lightbox from 'react-native-lightbox'

export function renderLightbox({props, title, rightBtns, child, content}) {
  return (
    <Lightbox
      renderHeader={(close) => (
        <Header style={{backgroundColor: 'transparent'}}>
          <Button transparent onPress={close} >
            <NbIcon name="ios-close" style={{fontSize: 30, color: 'white'}} />
          </Button>
          <Title style={{color: 'white'}} >{title}</Title>
          {rightBtns}
        </Header>
      )}
      {...props}
      renderContent={() => {
        return content || child
      }}
    >
    {child}
    </Lightbox>
  )
}

export function Line(props = {}) {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          borderTopWidth: 1,
          borderTopColor: '#979797',
          paddingTop: 5,
          paddingLeft: 5,
          marginBottom: 5 
        },
        props.style
      ]}
    >
      <H3 style={{flex: 1}} >{props.title}</H3>
    </View>
  )
}

