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
export default class DesignCard extends Component {
  static propTypes = {
    design: T.object.isRequired
  }
  static defaultProps = {}

  render() {
    const { design } = this.props
    if (!design) {
      return null
    }

    return (
      <Image style={styles.card} resizeMode="cover" source={design.banner} >
        <Image style={styles.avatar} source={design.avatar} />
        <Text style={styles.name} >{design.name}</Text>
        <View style={styles.info} >
          <Text style={styles.infoText} >{`${design.reviews} Reviews`}</Text>
          <Text style={styles.infoText} >{`${design.designs} designs`}</Text>
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

