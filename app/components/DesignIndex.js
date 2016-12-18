import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  Dimensions,
  StyleSheet,
  RecyclerViewBackedScrollView
} from 'react-native'
import GiftedListView from 'react-native-gifted-listview'
import {
  Content
} from 'native-base'
import { DesignCard } from '~/app/components'
import { connect } from 'react-redux'
import t from 'counterpart'

const window = Dimensions.get('window')

class DesignIndex extends Component {
  static propTypes = {
    theme: T.object,
    designers: T.array,
    designs: T.array
  }
  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      // designers: this.props.designers,
      // designs: this.props.designs
      designers: __MOCK__.designers,
      designs: __MOCK__.designs
    }
  }
  componentDidMount()     { }
  componentWillUnmount()  { }

  render() {
    const { theme } = this.props
    const { designers, designs } = this.state

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows([{type: 'designers'}, ...designs])

    return (
      <GiftedListView
        dataSource={dataSource}
        renderRow={this._renderRow.bind(this)}
        renderScrollComponent={ (props) => <RecyclerViewBackedScrollView {...props} /> }
      />
    )
  }

  _renderRow(rowData) {
    // return <DesignCard design={rowData} />
    if (rowData.type == 'designers') {
      return (
        <ScrollView horizontal >
          <View style={{width: window.width, height: 200, backgroundColor: 'green', margin: 5}} />
          <View style={{width: window.width, height: 200, backgroundColor: 'skyblue', margin: 5}} />
        </ScrollView>
      )
    } else {
      return <View style={{backgroundColor: 'skyblue', width: window.width, height: 50, marginVertical: 5}} />
    }
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
    designs: state.designs.designs,
    designers: state.designers.designers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignIndex)

/** __MOCK__ */
const lorem = require('lorem-ipsum')
const s = require('underscore.string')
const LOREM_NAME = function() {
  return s.capitalize(lorem({count: 1, units: 'words'})) + ' ' + s.capitalize(lorem({count: 1, units: 'words'}))
}
const __MOCK__ = {
  designers: [
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: LOREM_NAME(),
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-1.jpg')
    },
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: LOREM_NAME(),
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-2.jpg')
    },
    {
      avatar: require('~/app/assets/avatar-default.png'),
      name: LOREM_NAME(),
      reviews: '100+',
      designs: '100+',
      banner: require('~/app/assets/mock-pic-3.jpg')
    }
  ],
  designs: [
    {
      title: lorem({count: 2, units: 'words'}),
      content: lorem({count: 3}),
      banner: require('~/app/assets/mock-pic-1.jpg'),
      designer: {
        _id: 'sdf765324$%^&df%^3dkjjkj',
        avatar: require('~/app/assets/avatar-default.png'),
        name: LOREM_NAME()
      }
    },
    {
      title: lorem({count: 2, units: 'words'}),
      content: lorem({count: 3}),
      banner: require('~/app/assets/mock-pic-1.jpg'),
      designer: {
        _id: 'sdf765324$%^&df%^3dkjjkj',
        avatar: require('~/app/assets/avatar-default.png'),
        name: LOREM_NAME()
      }
    },
    {
      title: lorem({count: 2, units: 'words'}),
      content: lorem({count: 3}),
      banner: require('~/app/assets/mock-pic-1.jpg'),
      designer: {
        _id: 'sdf765324$%^&df%^3dkjjkj',
        avatar: require('~/app/assets/avatar-default.png'),
        name: LOREM_NAME()
      }
    },
    {
      title: lorem({count: 2, units: 'words'}),
      content: lorem({count: 3}),
      banner: require('~/app/assets/mock-pic-1.jpg'),
      designer: {
        _id: 'sdf765324$%^&df%^3dkjjkj',
        avatar: require('~/app/assets/avatar-default.png'),
        name: LOREM_NAME()
      }
    }
  ]
}

