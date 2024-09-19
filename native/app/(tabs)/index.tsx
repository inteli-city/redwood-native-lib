import React from 'react'

import { CameraView, useCameraPermissions } from 'expo-camera'
import { Button, StyleSheet, Text, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
// import { useBLE } from '@/hooks/useBLE'

export default function HomeScreen() {
  // const {
  //   scanForPeripherals,
  //   requestPermissions,
  //   allDevices,
  //   isScanning,
  //   stopScanForPeripherals,
  // } = useBLE()

  // const scanForDevices = async () => {
  //   const isPermissionsEnabled = await requestPermissions()
  //   if (isPermissionsEnabled) {
  //     scanForPeripherals()
  //   }
  // }

  const [permission, requestPermission] = useCameraPermissions()

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={styles.container}>
        <ThemedText>Camera permission loading</ThemedText>
      </View>
    )
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={'back'}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={({ data }) => console.log(data)}
      >
        <View style={styles.buttonContainer}></View>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
