import React, { useState } from 'react'

import { Button, StyleSheet, Text, View } from 'react-native'

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
    onDataReceived: (message) => {
      if (message.data === '\r') return

      console.log(message.data)

      const [action, content] = message.data.split(': ')

      switch (action) {
        case 'EP':
          setTags((old) => {
            if (old.includes(content)) return old
            return [...old, content]
          })
          break
        case 'CS':
          break
        case 'RI':
          setRI((old) => {
            if (old.includes(content)) return old
            return [...old, content]
          })
          break
        default:
          return
      }
    },
  })

  const riSet = Array.from(new Set(ri))
  const tagsSet = Array.from(new Set(tags))

  const createASCIICommand = (string: string) => {
    return string + '\n'
  }

  const send = async () => {
    if (!connectedDevice) return

    await connectedDevice.write(
      createASCIICommand(
        `.ft -al on -dt off -ie on -ip on -l hig -r off -sb epc -so 0000 -st op -t1 30 -t2 50 -t3 80 -to on`
      ),
      'ascii'
    )
  }

  return (
    <View style={styles.container}>
      <Button title={'get paired devices'} onPress={requestPairedDevices} />
      <Button title={'send'} onPress={send} />
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
