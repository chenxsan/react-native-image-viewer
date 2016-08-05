import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, NavigationExperimental } from 'react-native'
import PagerScene from './PagerScene'
const {
  Transitioner: NavigationTransitioner
} = NavigationExperimental
class PagerNavigator extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })).isRequired
    }).isRequired
  }
  _render = (transitionProps) => {
    const scenes = transitionProps.scenes.map((scene) => {
      const sceneProps = {
        ...transitionProps,
        scene
      }
      return this._renderScene(sceneProps)
    })
    return (
      <View style={styles.navigator}>
        {scenes}
      </View>
    )
  }
  _renderScene = (sceneProps) => {
    return <PagerScene
      {...sceneProps}
      key={sceneProps.scene.key + 'scene'}
      navigate={this.props.navigate}
      closeModal={this.props.closeModal}
       />
  }
  render () {
    return <NavigationTransitioner
      navigationState={this.props.navigationState}
      render={this._render}
      />
  }
}
export default PagerNavigator
const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})
