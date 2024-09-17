import React from 'react'

import { Button, Image, StyleSheet } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useBLE } from '@/hooks/useBLE'

export default function HomeScreen() {
  const { scanForPeripherals, requestPermissions, allDevices } = useBLE()

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions()
    console.log(isPermissionsEnabled)
    if (isPermissionsEnabled) {
      scanForPeripherals()
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Button title="connect" onPress={scanForDevices} />
        {allDevices.map((device) => (
          <ThemedText type="title" key={device.id}>
            {device.name}
          </ThemedText>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
