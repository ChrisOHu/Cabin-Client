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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import t from 'counterpart'

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
            latitude: 31.2304,
            longitude: 121.4737
          }
        },
        {
          title: "Sunshine Home",
          description: "Big window, great sunshine",
          latlng: {
            latitude: 31.2404,
            longitude: 121.4737
          }
        },
        {
          title: "Near by shore",
          description: "Near by shore, embrace the ocean...",
          latlng: {
            latitude: 31.2304,
            longitude: 121.4837
          }
        }
      ],
      currentRegion: {
        latitude: 31.2304,
        longitude: 121.4737,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      initialRegion: {
        latitude: 31.2304,
        longitude: 121.4737,
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

        // this.refs.mapView.animateToRegion({ region, duration: 600 })
        // this.setState({ region })
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  render() {
    return (
      <NbView style={styles.content} >

        <GooglePlacesAutocomplete
          styles={{
            container: {
              alignSelf: 'center',
              position: 'absolute',
              left: 0,
              top: 20,
              width: window.width,
              backgroundColor: 'transparent',
              zIndex: 2
            },
            textInputContainer: {
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            textInput: {
              backgroundColor: 'rgba(0,0,0, 0.5)',
              color: 'white'
            },
            listView: {
              backgroundColor: 'rgba(255,255,255, 1)'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: 'royalblue'
            },
            poweredContainer: {
              width: 0, height: 0, backgroundColor: 'transparent'
            },
            powered: {
              width: 0, height: 0, backgroundColor: 'transparent'
            }
          }}
          placeholder={t('search')}
          minLength={2}
          autoFocus={false}
          fetchDetails={true}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            /** details:
             *    address_components[]
             *    geometry.location.{lat, lng}
             */
            console.debug('## location =>')
            console.debug(data);
            console.debug('## location details =>')
            console.debug(details);
          }}
          getDefaultValue={() => {
            return ''
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyDeV-LbESXb8E0otu9yUwaNYROEj68L61g',
            language: 'zh-CN', /* t.getLocale(), */
            types: 'address' // default: 'geocode'
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel={t("currentLocation")}
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance'
          }}
          filterReverseGeocodingByTypes={[/*'locality', 'administrative_area_level_3'*/]}// filter reverse geocoding results by types
          predefinedPlaces={[]}
          predefinedPlacesAlwaysVisible={true}
        />

        <MapView
          ref="mapView"
          style={styles.map}
          initialRegion={this.state.initialRegion}
          region={this.state.currentRegion}
          showsUserLocation={true}
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

        <Button transparent style={styles.locateBtn} onPress={() => this.refs.mapView.animateToRegion(this.state.currentRegion)} >
          <Icon name="ios-locate-outline" style={{color: "#3a3a3a"}} />
        </Button>

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
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height
  },
  locateBtn: {
    position: 'absolute',
    left: 70,
    bottom: 20
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

