import React, { useEffect, useState } from 'react'

import { Button, StyleSheet, Text, View } from 'react-native'
import { BluetoothDevice } from 'react-native-bluetooth-classic'

import { useBluetooth } from '@/hooks/useBLE'

export default function HomeScreen() {
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice>()

  const {
    requestPermissions,
    allDevices,
    isScanning,
    stopScanForPeripherals,
    scanForPeripherals,
    pairedDevices,
    requestPairedDevices,
  } = useBluetooth()

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions()

    if (isPermissionsEnabled) {
      scanForPeripherals()
    } else {
      console.log('no permission')
      return
    }
  }

  const disconnectDevice = (device: BluetoothDevice) => {
    device.disconnect()
    setConnectedDevice(undefined)
  }

  const connectDevice = (device: BluetoothDevice) => {
    device.connect()
    setConnectedDevice(device)
  }

  useEffect(() => {
    requestPairedDevices()
  }, [])

  return (
    <View style={styles.container}>
      <Button
        title={isScanning ? 'stop Scanning' : 'start Scan'}
        onPress={isScanning ? stopScanForPeripherals : scanForDevices}
      />
      {pairedDevices.map((device) => (
        <View style={styles.listItem} key={device.id}>
          <View>
            <Text>Id: {`${device.id}`}</Text>
            <Text>Name: {`${device.name}`}</Text>
            <Text>Address: {`${device.address}`}</Text>
            <Text>rssi: {`${device.rssi}`}</Text>
          </View>
          <Button
            title={connectedDevice?.id === device.id ? 'disconnect' : 'connect'}
            onPress={
              connectedDevice?.id === device.id
                ? () => disconnectDevice(device)
                : () => connectDevice(device)
            }
          />
        </View>
      ))}
      {/* {allDevices.map((device) => (
        <View style={styles.listItem} key={device.id}>
          <View>
            <Text>Id: {`${device.id}`}</Text>
            <Text>Name: {`${device.name}`}</Text>
            <Text>Address: {`${device.address}`}</Text>
            <Text>rssi: {`${device.rssi}`}</Text>
          </View>
          <Button
            title={connectedDevice === device.id ? 'disconnect' : 'connect'}
            // onPress={
            //   connectedDevice === device.id
            //     ? () => disconnectDevice(device)
            //     : () => connectDevice(device)
            // }
          />
        </View>
      ))} */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    alignItems: 'flex-end',
  },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
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
