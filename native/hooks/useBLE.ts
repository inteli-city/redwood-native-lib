import { useMemo, useState } from 'react'

import * as ExpoDevice from 'expo-device'
import { PermissionsAndroid, Platform } from 'react-native'
import { BleManager, Device } from 'react-native-ble-plx'

export const useBLE = () => {
  const bleManager = useMemo(() => new BleManager(), [])
  const [isScanning, setIsScanning] = useState(false)
  const [allDevices, setAllDevices] = useState<Device[]>([])

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

  const isDuplicateDevice = (device: Device[], nextDevice: Device) =>
    device.findIndex((device) => nextDevice.id === device.id) > -1

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

  const scanForPeripherals = async () => {
    if (isScanning) {
      console.log('is already scanning')
      return
    }
    console.log('scanning...')

    setAllDevices([])

    setIsScanning(true)

    // const devices = await bleManager.connectedDevices([
    //   '00000000-0000-1000-8000-00805F9B34FB',
    // ])

    // console.log(devices)

    bleManager.startDeviceScan(
      null,
      {
        allowDuplicates: true,
        scanMode: 0,
      },
      (error, device) => {
        if (error) {
          console.log(error)
        }

        if (device && !device.isConnectable) {
          setAllDevices((old) => {
            if (isDuplicateDevice(old, device)) {
              return old
            }

            console.log(device)

            return [...old, device]
          })
        }
      }
    )
  }

  const stopScanForPeripherals = async () => {
    setIsScanning(false)
    await bleManager.stopDeviceScan()
  }

  return {
    isScanning,
    scanForPeripherals,
    stopScanForPeripherals,
    requestPermissions,
    allDevices,
  }
}
