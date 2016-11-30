import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  Text,
  View,
  Dimensions,
  StyleSheet
} from 'react-native'
import {
  Content
} from 'native-base'
import { connect } from 'react-redux'
import t from 'counterpart'

const window = Dimensions.get('window')

class Designs extends Component {
  static propTypes = {
    theme: T.object
  }

  constructor(props) {
    super(props)

    this.state = {
      designs: __MOCK.designs
    }
  }
  componentDidMount()     { }
  componentWillUnmount()  { }

  render() {
    const { theme } = this.props
    const { designs } = this.state
    return (
      <Content theme={theme} style={styles.content} >
        {designs.map((design) => (
          <Image style={{width: window.width, height: 300, flex: 1, justifyContent: 'center', alignItems: 'center'}}
            resizeMode="cover" source={design.banner} >
            <Image style={{width: 60, height: 60, marginBottom: 6}} source={design.avatar} />
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10}} >{design.name}</Text>
            <View style={{paddingHorizontal: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} >
              <Text style={{fontSize: 16, color: 'white'}}>{`${design.reviews} Reviews`}</Text>
              <Text style={{fontSize: 16, color: 'white'}}>{`${design.designs} Designs`}</Text>
            </View>
          </Image>
        ))}
      </Content>
    )
  }

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Designs)

const __MOCK = {
  designs: [
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: 'Lily•Lee',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pick-1.jpg')
    },
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: 'Lily•Lee',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pick-2.jpg')
    },
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: 'Lily•Lee',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pick-3.jpg')
    }
  ]
}


