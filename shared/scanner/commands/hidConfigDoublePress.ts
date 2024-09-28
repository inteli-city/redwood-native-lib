import { HIDConfigCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

//REVISAR
type HIDConfigCommandParams = {
  /** Delay between characters sent via HID (0 to 999 ms) */
  characterDelay?: HIDConfigCommand['params']['cd']
  /** HID keyboard region @default 'def' */
  keyboardRegion?: HIDConfigCommand['params']['kb']
  /** List the current parameter values */
  listParams?: HIDConfigCommand['params']['p']
  /** Trigger mode: single shot, read until success, or while pressed @default 0 */
  triggerMode?: HIDConfigCommand['params']['tm']
  /** Reset parameters to defaults */
  resetToDefault?: HIDConfigCommand['params']['x']
}

/**
 * Defines settings for HID.
 */
export function hidConfig(params: HIDConfigCommandParams = {}) {
  const hidConfigParams: HIDConfigCommand['params'] = {
    cd: params.characterDelay,
    kb: params.keyboardRegion ?? 'def',
    p: params.listParams,
    tm: params.triggerMode ?? 0,
    x: params.resetToDefault,
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.HID_CONFIG} ${ScannerHelper.parseParamsToText(hidConfigParams)}`
  )
}
