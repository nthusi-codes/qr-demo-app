import React from 'react';
import { StyleSheet, Text, Button, View,ToastAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {

  state = {
    hasCameraPermission: false,
    scanned: true
  }

  getPermissions = () => {
    Permissions.askAsync(Permissions.CAMERA).then(permission => {
      console.log('permission: ', permission);
      this.setState({ hasCameraPermission: permission.status === 'granted' });
    }).catch(err=>{
      console.log('failed to get camera permission: ', err);
      ToastAndroid.show('failed to get permission',ToastAndroid.SHORT);
    });
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }
  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === false) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No access to camera</Text>
          <Button title={'request camera permission'}
            onPress={() => this.getPermissions()} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject} />
        {scanned && (<Button title={'Tap to scan'}
          onPress={() => this.setState({ scanned: false })} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
