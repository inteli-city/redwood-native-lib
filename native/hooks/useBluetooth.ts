import { useState } from 'react'

import * as ExpoDevice from 'expo-device'
import { PermissionsAndroid, Platform } from 'react-native'
import RNBluetoothClassic, {
  type BluetoothDevice,
  type BluetoothDeviceReadEvent,
  type BluetoothEventListener,
} from 'react-native-bluetooth-classic'

type UseBluetoothOptions = {
  onDataReceived?: BluetoothEventListener<BluetoothDeviceReadEvent>
}

export const useBluetooth = (options: UseBluetoothOptions = {}) => {
  const [isScanning, setIsScanning] = useState(false)
  const [allDevices, setAllDevices] = useState<BluetoothDevice[]>([])
  const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[]>([])
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice>()

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
    const isPermissionsEnabled = await requestPermissions()

    if (!isPermissionsEnabled) {
      console.log('no permission')
    }

    const available = await RNBluetoothClassic.isBluetoothAvailable()

    if (!available) {
      console.log('bluetooth is not available')
      return
    }

    const enabled = await RNBluetoothClassic.isBluetoothEnabled()

    if (!enabled) {
      console.log('bluetooth is not enabled')
      return
    }

    const paired = await RNBluetoothClassic.getBondedDevices()

    const scannerPaired = paired.filter(({ name }) =>
      name.toLowerCase().includes('2128p')
    )

    setPairedDevices(scannerPaired)
  }

  const scanForPeripherals = async () => {
    const isPermissionsEnabled = await requestPermissions()
    if (!isPermissionsEnabled) {
      console.log('no permission')
      return
    }

    if (isScanning) {
      return
    }

    setAllDevices([])
    setIsScanning(true)

    const unpairedDevices = await RNBluetoothClassic.startDiscovery()

    setAllDevices(unpairedDevices)
    setIsScanning(false)
  }

  const stopScanForPeripherals = async () => {
    await RNBluetoothClassic.cancelDiscovery()
    setIsScanning(false)
  }

  const connectDevice = async (device: BluetoothDevice) => {
    if (connectedDevice) {
      connectedDevice.disconnect()
    }

    await device.connect()

    if (options?.onDataReceived) {
      device.onDataReceived(options.onDataReceived)
    }

    setConnectedDevice(device)
  }

  const connectDeviceByAddress = async (
    address: string = '94:DE:B8:AD:52:67'
  ) => {
    const isPermissionsEnabled = await requestPermissions()

    if (!isPermissionsEnabled) {
      console.log('no permission')
    }

    const pair = await RNBluetoothClassic.pairDevice(address)

    pair.connect()
  }

  const disconnectCurrentDevice = () => {
    if (!connectedDevice) return

    connectedDevice.disconnect()
    setConnectedDevice(undefined)
  }

  return {
    scanForPeripherals,
    stopScanForPeripherals,
    requestPermissions,
    requestPairedDevices,
    disconnectCurrentDevice,
    connectDevice,
    connectDeviceByAddress,
    isScanning,
    allDevices,
    connectedDevice,
    pairedDevices,
  }
}
