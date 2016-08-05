import React, { Component, PropTypes } from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import ImagePager from './components/ImagePager'
class LightBox extends Component {
  static propTypes = {
    modalVisibility: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })).isRequired
    }).isRequired
  }
  render () {
    return (
      <View style={styles.container}>
        <Modal transparent
          animationType={'fade'}
          visible={this.props.modalVisibility}
          >
          <View style={styles.wrapper}>
            <ImagePager navigationState={this.props.navigationState}
              closeModal={this.props.closeModal}
            />
          </View>
        </Modal>
      </View>
    )
  }
}
export default LightBox
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)'
  }
})
