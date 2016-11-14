import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  Header,
  Title,
  View as NbView,
  Text as NbText,
  Button,
  Icon,
  InputGroup,
  Input
} from 'native-base'
import { connect } from 'react-redux'

import ParallaxScrollView from '~/app/common/ParallaxScrollView'
import { KeyboardAwareScrollView } from '~/app/common/KeyboardAwareViews'

class Wall extends Component {
  static propTypes = {
    theme: T.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { theme } = this.props

    return (
      <ParallaxScrollView
        style={styles.root}
        contentContainerStyle={[{flex: 1, backgroundColor: theme.sceneBgColor }]}
        backgroundColor="transparent"
        renderScrollComponent={ props => <KeyboardAwareScrollView {...props} /> }
        renderBackground={() => {
          {/*return <Image source={require('./assets/logo.png')} resizeMode='contain' style={styles.logo} />*/}
          return (
            <View style={[styles.header, { backgroundColor: theme.sceneBgColor }]} >
              <Text style={{color: 'skyblue', lineHeight: 40, fontSize: 36, fontWeight: 'bold'}}>{`</>`}</Text>
            </View>
          )
        }}
        renderForeground={() => null}
        parallaxHeaderHeight={200} >

        <NbView theme={theme} style={[styles.content, { backgroundColor: theme.sceneBgColor }]} >
          <Text>Wall</Text>
        </NbView>
      </ParallaxScrollView>
    );
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  header: {
    height: 200
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wall)

