import React, { useState } from 'react'

import { Button, StyleSheet, Text, View } from 'react-native'

import {
  ResponseHeaderManager,
  batteryLevel,
  inventory,
  switchAction,
  userDefinedSinglePressAction,
  RESPONSE_FIELD_HEADER,
} from '../../../shared/scanner/'

import { useBluetooth } from '@/hooks/useBluetooth'

export default function HomeScreen() {
  const [tags, setTags] = useState<string[]>([])
  const [ri, setRI] = useState<string[]>([])

  const clearLists = () => {
    setRI([])
    setTags([])
  }

  const {
    pairedDevices,
    connectedDevice,
    requestPairedDevices,
    connectDevice,
    disconnectCurrentDevice,
  } = useBluetooth({
    async onConnectDevice(device) {
      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.TRANSPONDER_EPC_VALUE,
        (value) => {
          setTags((tags) => [...tags, value])
        }
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.TRANSPONDER_RSSI_VALUE,
        (value) => {
          setRI((ris) => [...ris, value])
        }
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.MANUFACTURER_NAME,
        (value) => console.log('manufacturer name:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.UNIT_SERIAL_NUMBER,
        (value) => console.log('unit serial number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.UNIT_FIRMWARE_VERSION_NUMBER,
        (value) => console.log('unit firmware version number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.UNIT_BOOTLOADER_VERSION_NUMBER,
        (value) => console.log('unit bootloader version number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.PROTOCOL_VERSION_NUMBER,
        (value) => console.log('protocol version number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.PROTOCOL_VERSION_NUMBER,
        (value) => console.log('protocol version number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.RADIO_SERIAL_NUMBER,
        (value) => console.log('radio serial number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.RADIO_FIRMWARE_VERSION_NUMBER,
        (value) => console.log('radio firmware version number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.RADIO_BOOTLOADER_VERSION_NUMBER,
        (value) => console.log('radio bootloader version number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.UHF_API_VERSION,
        (value) => console.log('UHF API Version:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.ANTENNA_SERIAL_NUMBER,
        (value) => console.log('antena serial number:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.BLUETOOTH_ADDRESS,
        (value) => console.log('bluetooth address:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.BLUETOOTH_VERSION,
        (value) => console.log('bluetooth version:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.BATTERY_PERCENTAGE_LEVEL,
        (value) => console.log('battery level:', value)
      )

      ResponseHeaderManager.registerHandler(
        RESPONSE_FIELD_HEADER.BATTERY_HEALTH,
        (value) => console.log('battery level:', value)
      )

      await device.write(
        batteryLevel({
          batteryHealth: true,
        })
      )

      await device.write(
        switchAction({
          singlePressAction: 'usr',
        }),
        'ascii'
      )

      await device.write(
        userDefinedSinglePressAction({
          userAction: inventory({
            includeRSSI: 'on',
          }),
        })
      )
    },
    onDataReceived: (message) => {
      ResponseHeaderManager.sendEvent(message.data)
    },
  })

  const riSet = Array.from(new Set(ri))
  const tagsSet = Array.from(new Set(tags))

  return (
    <View style={styles.container}>
      <Button title={'get paired devices'} onPress={requestPairedDevices} />

      {pairedDevices.map((device) => (
        <View style={styles.listItem} key={device.id}>
          <View>
            <Text>Id: {`${device.id}`}</Text>
            <Text>Name: {`${device.name}`}</Text>
            <Text>Address: {`${device.address}`}</Text>
          </View>
          <Button
            title={device.id === connectedDevice?.id ? 'disconnect' : 'connect'}
            onPress={
              connectedDevice?.id === device.id
                ? () => disconnectCurrentDevice()
                : () => connectDevice(device)
            }
          />
        </View>
      ))}

      <View>
        <Text>Tags:</Text>
      </View>

      <View>
        {tagsSet.map((tag, index) => (
          <Text key={tag}>
            {tag} - {`(RSSI): ${riSet[index]}`}
          </Text>
        ))}
      </View>

      <Button title={'Limpar'} onPress={clearLists} />
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
