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
import {
  Content
} from 'native-base'
import { connect } from 'react-redux'
import t from 'counterpart'

const window = Dimensions.get('window')

class Designers extends Component {
  static propTypes = {
    theme: T.object
  }

  constructor(props) {
    super(props)

    this.state = {
      designers: __MOCK.designers
    }
  }
  componentDidMount()     { }
  componentWillUnmount()  { }

  render() {
    const { theme } = this.props
    const { designers } = this.state
    return (
      <Content theme={theme} contentContainerStyle={styles.content} >
        {designers.map((designer, i) => (
          <Image key={`designer-${i}`} style={{width: window.width, height: 200, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginBottom: 1}}
            resizeMode="cover" source={designer.banner} >
            <Image style={{width: 60, height: 60, marginBottom: 6}} source={designer.avatar} />
            <Text style={{fontSize: 20, fontWeight: 'bold', backgroundColor: 'transparent', color: 'white', marginBottom: 10}} >{designer.name}</Text>
            <View style={{paddingHorizontal: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
              <Text style={{fontSize: 16, backgroundColor: 'transparent', color: 'white'}}>{`${designer.reviews} Reviews`}</Text>
              <Text style={{fontSize: 16, backgroundColor: 'transparent', color: 'white'}}>{`${designer.designs} designers`}</Text>
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
    alignItems: 'center',
    paddingTop: 90
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
)(Designers)

const __MOCK = {
  designers: [
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: 'Lily•Lee',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-1.jpg')
    },
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: 'Lily•Lee',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-2.jpg')
    },
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: 'Lily•Lee',
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-3.jpg')
    }
  ]
}


