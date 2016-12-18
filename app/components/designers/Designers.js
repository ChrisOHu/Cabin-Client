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
import DesignerCard from './DesignerCard'
import { connect } from 'react-redux'
import t from 'counterpart'

const window = Dimensions.get('window')

class Designers extends Component {
  static propTypes = {
    theme: T.object,
    designers: T.array
  }

  constructor(props) {
    super(props)

    this.state = {
      designers: this.props.designers
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
          <DesignerCard key={`designer-${i}`} designer={designer} />
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
    theme: state.theme,
    designers: state.designers.designers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Designers)

