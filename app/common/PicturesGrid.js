import React, {
  Component,
  PropTypes as T
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import {
  Button,
  View as NbView
} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import Lightbox from './Lightbox'
import PlusButton from './PlusButton'

const window = Dimensions.get('window')

class PicturesGrid extends Component {
  static propTypes = {
    theme: T.object.isRequired,
    pictures: T.arrayOf(T.string),
    editable: T.bool,
    maxPictures: T.number
  }
  static defaultProps = {
    pictures: [],
    editable: false,
    maxPictures: 9
  }

  constructor(props) {
    super(props)

    this.state = {
      pictures: this.props.pictures || []
    }
  }
  /**
   * returns an array of objects:
   * [
   *   {path, size, width, height, mime}
   *   ...
   * ]
   */
  getPictures() {
    return this.state.pictures
  }

  render() {
    const { theme } = this.props

    const pictures = [...this.state.pictures, ':CALL_ELF:']
    const lastIndex = pictures.length - 1
    return (
      <NbView style={styles.content} theme={theme}>
        {pictures.map((picture, index) => {
          return index == lastIndex ?
            this._renderPlusBtn('plusBtn') :
            (
              <Lightbox
                style={styles.pictureContainer}
                key={`pic-${index}`}
                rightBtns={(close) => (
                  <Button transparent textStyle={{color: 'white'}}
                    onPress={() => {
                      const pictures = [...this.state.pictures]
                      pictures.splice(index, 1)
                      this.setState({pictures})
                      close()
                    }}
                  >
                    <Icon name="ios-trash-outline" style={{fontSize: 24, color: 'white'}} />
                  </Button>
                )}
                content={(
                  <Image style={{width: window.width, height: window.height, backgroundColor: 'rgba(0,0,0,0)'}}
                    source={{ uri: picture }}
                    resizeMode='center'
                  />
                )}
              >
                <Image style={styles.picture} source={{uri: picture}} resizeMode="cover" />
              </Lightbox>
            )
        })}
      </NbView>
    )
  }

  _renderPlusBtn(key) {
    const picsCount = this.state.pictures.length
    const maxPictures = this.props.maxPictures
    if (this.props.editable && picsCount < maxPictures) {
      return (
        <PlusButton
          key={key}
          size={PICTURE_SIZE}
          style={{marginLeft: PADDING, marginBottom: PADDING}}
          onPress={() => {
            ImagePicker.openPicker({
              cropping: true,
              multiple: true,
              maxFiles: maxPictures - picsCount
            }).then(images => {
              const pictures = [...this.state.pictures, ...images.map((o) => o.path)]
              this.setState({pictures})
            })
          }}
        />
      )
    }
  }
  _previewImage() {
  }
}

const PADDING = 10
const PICTURE_SIZE = (window.width - 10 * 4) / 3
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  pictureContainer: {
    width: PICTURE_SIZE,
    height: PICTURE_SIZE,
    marginLeft: PADDING,
    marginBottom: PADDING
  },
  picture: {
    width: PICTURE_SIZE,
    height: PICTURE_SIZE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#979797'
  }
});

export default PicturesGrid

