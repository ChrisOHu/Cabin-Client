import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import {
  View as NbView
} from 'native-base'
import { connect } from 'react-redux'
import t from 'counterpart'

class FiveThirty extends Component {
  static propTypes = {
    theme: T.object
  }

  constructor(props) {
    super(props)

    this.state = {
      hours: 5,
      minutes: 30,
      seconds: 0
    }
  }
  componentDidMount() {
    this.__intervalId = setInterval(() => {
      let { hours, minutes, seconds } = this.state
      seconds++

      minutes = seconds >= 60 ? minutes + 1 : minutes
      hours   = minutes >= 60 ? hours + 1   : hours

      seconds = seconds >= 60 ? seconds-60  : seconds
      minutes = minutes >= 60 ? minutes-60  : minutes
      hours   = hours   >= 24 ? hours-24    : hours

      this.setState({hours, minutes, seconds})
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.__intervalId)
  }

  render() {
    const { theme } = this.props
    const { hours, minutes, seconds } = this.state
    const hoursStr   = '' + hours
    const minutesStr = minutes > 9 ? '' + minutes : '0' + minutes
    const secondsStr = seconds > 9 ? '' + seconds : '0' + seconds

    return (
      <NbView theme={theme} style={styles.content} >
        <Text style={{color: 'royalblue', fontSize: 40, marginBottom: 60}} >
          {`${hoursStr}:${minutesStr}:${secondsStr}`}
        </Text>
      </NbView>
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
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiveThirty)

