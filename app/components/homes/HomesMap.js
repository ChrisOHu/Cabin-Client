import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  View,
  Text,
  Dimensions,
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
  Input,
  SearchBar
} from 'native-base'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'

const window = Dimensions.get('window')

class HomesMap extends Component {
  static propTypes = {
    theme: T.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      searching: false,
      homes: [
        {
          title: "Cozy Home",
          description: "cozy and comfortable home",
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324
          }
        },
        {
          title: "Sunshine Home",
          description: "Big window, great sunshine",
          latlng: {
            latitude: 37.78625,
            longitude: -122.4324
          }
        },
        {
          title: "Near by shore",
          description: "Near by shore, embrace the ocean...",
          latlng: {
            latitude: 37.78425,
            longitude: -122.4324
          }
        }
      ],
      currentRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        /**
         * {
         *   "coords": {
         *      "speed":-1,
         *      "longitude": -122.406417,
         *      "latitude": 37.785834,
         *      "accuracy": 5,
         *      "heading":-1,
         *      "altitude":0,
         *      "altitudeAccuracy": -1
         *   },
         *   "timestamp": 1478764885161.709
         * }
         */
        console.log(JSON.stringify(position))

        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }

        this.refs.mapView.animateToRegion({ region, duration: 600 })
        this.setState({ region })
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  render() {
    return (
      <NbView style={styles.content} >

        <SearchBar transparent lightTheme round placeholder="Search for homes..."
          containerStyle={styles.searchBar}
          onSubmitEditing={() => alert('Searching...')}
        />

        <MapView
          ref="mapView"
          style={styles.map}
          initialRegion={this.state.initialRegion}
          region={this.state.currentRegion}
        >
          {this.state.homes.map((marker, index) => (
            <MapView.Marker
              key={`home-marker-${index}`}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>

      </NbView>
    );
  }

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBar: {
    alignSelf: 'center',
    position: 'absolute',
    top: 20,
    left: 0,
    width: window.width,
    zIndex: 1
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height
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
)(HomesMap)

