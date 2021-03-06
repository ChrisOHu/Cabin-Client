import React, { Component } from 'react';
import {
  TextInput,
} from 'react-native';

export default class AutogrowInput extends Component {
  static propTypes = {
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    onChange: React.PropTypes.func,
    defaultHeight: React.PropTypes.number,
  }
  static defaultProps = {
    defaultHeight: 35
  }

  constructor() {
    super();
    this.state = {
      height: 35,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { defaultHeight } = this.props;

    if (defaultHeight) {
      this.setState({
        height: defaultHeight,
      });
    }
  }

  handleChange(event) {
    if (this.state.height !== event.nativeEvent.contentSize.height) {
      this.setState({
        height: Math.max(this.props.defaultHeight, event.nativeEvent.contentSize.height),
      });
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  resetInputText() {
    this.refs.input.setNativeProps({ text: '' });
    this.setState({
      height: this.props.defaultHeight,
    });
  }

  render() {
    return (
      <TextInput
        ref="input"
        multiline
        {...this.props}
        style={[this.props.style, {height: this.state.height}]}
        onChange={this.handleChange}
      />);
  }
}


