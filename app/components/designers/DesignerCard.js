import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native'

const window = Dimensions.get('window')
export default class DesignerCard extends Component {
  static propTypes = {
    designer: T.object.isRequired
  }
  static defaultProps = {}

  render() {
    const { designer } = this.props
    if (!designer) {
      return null
    }

    return (
      <Image style={styles.card} resizeMode="cover" source={designer.banner} >
        <Image style={styles.avatar} source={designer.avatar} />
        <Text style={styles.name} >{designer.name}</Text>
        <View style={styles.info} >
          <Text style={styles.infoText} >{`${designer.reviews} Reviews`}</Text>
          <Text style={styles.infoText} >{`${designer.designs} designers`}</Text>
        </View>
      </Image>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    width: window.width,
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 1
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom: 6
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'white',
    marginBottom: 10
  },
  info: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoText: {
    fontSize: 16,
    backgroundColor: 'transparent',
    color: 'white'
  }
})

