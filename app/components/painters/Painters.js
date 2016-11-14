import React, {
  PropTypes as T,
  Component
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

class Painters extends Component {
  static propTypes = {
    theme: T.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <Text style={styles.content} >
        Painters
      </Text>
    );
  }

}

const styles = StyleSheet.create({
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
  return { }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Painters)

