import React, { Component, PropTypes } from 'react'
import { View, Dimensions, StyleSheet, NavigationExperimental } from 'react-native'
import PagerNavigator from './PagerNavigator'
const {width} = Dimensions.get('window')
const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental
function reducer (state, action) {
  switch (action) {
    case 'back':
      return NavigationStateUtils.back(state)
    case 'forward':
      return NavigationStateUtils.forward(state)
  }
  return state
}
class Pager extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })).isRequired
    }).isRequired
  }
  state = {
    navigationState: reducer(this.props.navigationState)
  }
  render () {
    return <View style={styles.pager}>
      <PagerNavigator
        navigationState={this.state.navigationState}
        navigate={action => this._navigate(action)}
        closeModal={this.props.closeModal}
      />
    </View>
  }
  _navigate = (action) => {
    const navigationState = reducer(this.state.navigationState, action)
    if (navigationState === this.state.navigationState) {
      return false
    }
    this.setState({
      navigationState: navigationState
    })
    return true
  }
}
export default Pager
const styles = StyleSheet.create({
  pager: {
    flex: 1,
    width: width
  }
})
