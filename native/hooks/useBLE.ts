import { useState } from 'react'

import * as ExpoDevice from 'expo-device'
import { PermissionsAndroid, Platform } from 'react-native'
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic'

export const useBluetooth = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [allDevices, setAllDevices] = useState<BluetoothDevice[]>([])
  const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[]>([])

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Scan Permission',
        message: 'App Requires Bluetooth Scanning',
        buttonPositive: 'OK',
      }
    )

    const bluetoothConnectionPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Scan Permission',
        message: 'App Requires Bluetooth Connecting',
        buttonPositive: 'OK',
      }
    )

    const bluetoothFineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Scan Permission',
        message: 'App Requires fine location',
        buttonPositive: 'OK',
      }
    )

    return (
      bluetoothScanPermission === 'granted' &&
      bluetoothConnectionPermission === 'granted' &&
      bluetoothFineLocationPermission === 'granted'
    )
  }

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App Requires Location Access',
            buttonPositive: 'OK',
          }
        )

        return granted === PermissionsAndroid.RESULTS.GRANTED
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions()
        return isAndroid31PermissionsGranted
      }
    } else {
      return true
    }
  }

  const requestPairedDevices = async () => {
    const available = await RNBluetoothClassic.isBluetoothAvailable()
    console.log('available', available)
    if (!available) return

    const enabled = await RNBluetoothClassic.isBluetoothEnabled()
    console.log('enabled', enabled)

    if (!enabled) return

    const paired = await RNBluetoothClassic.getBondedDevices()

    setPairedDevices(paired)

    console.log(paired)
  }

  const scanForPeripherals = async () => {
    if (isScanning) {
      console.log('is already scanning')
      return
    }
    setAllDevices([])
    console.log('scanning...')
    setIsScanning(true)

    const unpaired = await RNBluetoothClassic.startDiscovery()

    // console.log(unpaired)

    // const pair = await RNBluetoothClassic.pairDevice('94:DE:B8:AD:52:67')

    // console.log(pair)

    // pair.connect()

    setAllDevices(unpaired)

    setIsScanning(false)
  }

  const stopScanForPeripherals = async () => {
    setIsScanning(false)
    // await bleManager.stopDeviceScan()
  }

  return {
    isScanning,
    scanForPeripherals,
    stopScanForPeripherals,
    requestPermissions,
    requestPairedDevices,
    allDevices,
    pairedDevices,
  }
}
