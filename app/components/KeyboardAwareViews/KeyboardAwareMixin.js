/* @flow */

import { PropTypes } from 'react'
import ReactNative, { TextInput, Keyboard, Platform } from 'react-native'
import TimerMixin from 'react-timer-mixin'

const _KAM_DEFAULT_TAB_BAR_HEIGHT = 49
const _KAM_KEYBOARD_OPENING_TIME = 250
const _KAM_EXTRA_HEIGHT = 75

const isAndroid = () => Platform.OS === 'android'

const KeyboardAwareMixin = {
  mixins: [TimerMixin],
  propTypes: {
    enableAutoAutomaticScroll: PropTypes.bool,
    extraHeight: PropTypes.number,
  },

  getDefaultProps: function () {
    return {
        enableAutoAutomaticScroll: true,
        extraHeight: _KAM_EXTRA_HEIGHT,
    }
  },

  setViewIsInsideTabBar: function (viewIsInsideTabBar: bool) {
    this.viewIsInsideTabBar = viewIsInsideTabBar
    this.setState({keyboardSpace: _KAM_DEFAULT_TAB_BAR_HEIGHT})
  },

  setResetScrollToCoords: function (coords: {x: number, y: number}) {
    this.resetCoords = coords
  },

  getInitialState: function (props: Object) {
    this.viewIsInsideTabBar = false
    this.keyboardWillShowEvent = undefined
    this.keyboardWillHideEvent = undefined
    return {
      keyboardSpace: 0,
    }
  },

  // Keyboard actions
  updateKeyboardSpace: function (frames: Object) {
    const keyboardSpace = (this.props.viewIsInsideTabBar) ? frames.endCoordinates.height - _KAM_DEFAULT_TAB_BAR_HEIGHT : frames.endCoordinates.height
    this.setState({
      keyboardSpace: keyboardSpace,
    })
    // Automatically scroll to focused TextInput
    if (this.props.enableAutoAutomaticScroll) {
      const currentlyFocusedField = TextInput.State.currentlyFocusedField()
      if (!currentlyFocusedField) {
        return
      }
      try {
        this.scrollToFocusedInputWithNodeHandle(currentlyFocusedField)
      } catch (e) {
        console.error('OPs =>');
        console.error(e);
      }
    }
  },

  resetKeyboardSpace: function () {
    const keyboardSpace = (this.props.viewIsInsideTabBar) ? _KAM_DEFAULT_TAB_BAR_HEIGHT : 0
    this.setState({
      keyboardSpace: keyboardSpace,
    })
    // Reset scroll position after keyboard dismissal
    if (this.resetCoords) {
      this.scrollToPosition(this.resetCoords.x, this.resetCoords.y, true)
    }
  },

  componentDidMount: function () {
    // Keyboard events
    const events = {
      show: isAndroid() ? 'keyboardDidShow' : 'keyboardWillShow',
      hide: isAndroid() ? 'keyboardDidHide' : 'keyboardWillHide',
    }
    this.keyboardWillShowEvent = Keyboard.addListener(events.show, this.updateKeyboardSpace)
    this.keyboardWillHideEvent = Keyboard.addListener(events.hide, this.resetKeyboardSpace)
  },

  componentWillUnmount: function () {
    this.keyboardWillShowEvent.remove()
    this.keyboardWillHideEvent.remove()
  },

  scrollToPosition: function (x: number, y: number, animated: bool = false) {
    const scrollView = this.refs._rnkasv_keyboardView.getScrollResponder()
    scrollView.scrollResponderScrollTo({x: x, y: y, animated: animated})
  },

  /**
   * @param extraHeight: takes an extra height in consideration.
   */
  scrollToFocusedInput: function (reactNode: Object, extraHeight: number = this.props.extraHeight) {
    // Android already does this
    if(isAndroid()) return;

    const scrollView = this.refs._rnkasv_keyboardView.getScrollResponder()
    this.setTimeout(() => {
      //FIXME:
      // scrollView.scrollResponderScrollNativeHandleToKeyboard(
      //   reactNode, extraHeight, true
      // )
    }, _KAM_KEYBOARD_OPENING_TIME)
  },

  scrollToFocusedInputWithNodeHandle: function (nodeID: number, extraHeight: number = this.props.extraHeight) {
    const reactNode = ReactNative.findNodeHandle(nodeID)
    this.scrollToFocusedInput(reactNode, extraHeight)
  },
}

export default KeyboardAwareMixin