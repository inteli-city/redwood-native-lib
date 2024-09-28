import { BluetoothCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type BluetoothCommandParams = {
  /** set iOS Bundle ID, up to 80 characters, enclosed in double quotes (") @default "TSL demo app Bundle ID" */
  bundleId?: BluetoothCommand['params']['bi']
  /** Turn Bluetooth® on or off @default 'on' */
  enableBluetooth?: BluetoothCommand['params']['e']
  /** set iOS Bundle Seed ID, 10 characters enclosed in double quotes (") @default "“TSL demo app Bundle Seed ID"*/
  bundleSeed?: BluetoothCommand['params']['bs']
  /** set the Bluetooth® friendly name, up to 20 characters, enclosed in double quotes (") @default unitSerialNumber */
  bluetoothName?: BluetoothCommand['params']['f']
  /** Set Bluetooth® for either HID or SPP mode, x is implied as a full reset will be
  performed. (hii is HID with iOS keyboard pop, this option may cause issues
  with Android 5 and 6) @default 'spp' */
  mode?: BluetoothCommand['params']['m']
  /** List the available parameters (not their values) */
  listParams?: BluetoothCommand['params']['p']
  /** The pin for legacy Bluetooth® pairing @default '0000'*/
  legacyBluetoothPin?: BluetoothCommand['params']['w']
  /** Reset Bluetooth® settings to defaults for current mode (HID or SPP */
  resetToDefault?: BluetoothCommand['params']['x']
}

/**
 * Reads the Bluetooth® address, additionally the Bluetooth® can be reset and configured.
 This command is only available over the USB interface and cannot be used in the Autorun file.
 *
 * Settings made with this command are persistent and not reset to defaults at power up.
 */
export function bluetooth(params: BluetoothCommandParams = {}) {
  const bluetoothParams: BluetoothCommand['params'] = {
    bi: ScannerHelper.quotedParameter(params.bundleId),
    e: params.enableBluetooth,
    bs: ScannerHelper.quotedParameter(params.bundleSeed),
    f: ScannerHelper.quotedParameter(params.bluetoothName),
    m: params.mode,
    p: ScannerHelper.booleanParameter(params.listParams),
    w: params.legacyBluetoothPin,
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.BLUETOOTH} ${ScannerHelper.parseParamsToText(bluetoothParams)}`
  )
}
