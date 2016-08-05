import React, { Component, PropTypes } from 'react'
import { View, Dimensions, StyleSheet, TouchableHighlight, NavigationExperimental, Animated,
  ScrollView, StatusBar } from 'react-native'
const DEVICE_WIDTH = Dimensions.get('window').width
import Image from 'react-native-image-progress'
const {
  Card: NavigationCard
} = NavigationExperimental
const {
  PagerPanResponder: NavigationPagerPanResponder,
  PagerStyleInterpolator: NavigationPagerStyleInterpolator
} = NavigationCard
class PagerScene extends Component {
  static propTypes = {
    scene: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  }
  render () {
    const {scene, navigate} = this.props

    const panHandlers = NavigationPagerPanResponder.forHorizontal({
      ...this.props,
      onNavigateBack: () => navigate('back'),
      onNavigateForward: () => navigate('forward')
    })
    const style = [
      styles.scene,
      NavigationPagerStyleInterpolator.forHorizontal(this.props)
    ]
    return (
      <Animated.View
        {...panHandlers}
        style={style}>
        <View style={styles.wrapper}>
          <StatusBar hidden />
          <ScrollView maximumZoomScale={scene.route.size / DEVICE_WIDTH * 2}
            minimumZoomScale={1}
            style={{flex: 1}}
            contentContainerStyle={{
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1}}
            >
            <TouchableHighlight onPress={this.props.closeModal}
              style={styles.clickArea}
            >
              <Image source={{uri: scene.route.url}}
                resizeMode='contain'
                style={styles.item} />
            </TouchableHighlight>
          </ScrollView>
        </View>
      </Animated.View>
    )
  }
}
export default PagerScene
const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#000',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  wrapper: {
    flex: 1
  },
  clickArea: {
    flex: 1
  },
  item: {
    width: DEVICE_WIDTH,
    flex: 1
  }
})
