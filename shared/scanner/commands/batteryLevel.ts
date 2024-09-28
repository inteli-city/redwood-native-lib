import { BatteryLevelCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type BatteryLevelCommandParams = {
  /** Include battery health in the response */
  batteryHealth?: BatteryLevelCommand['params']['bh']
}

/**
 * Returns Battery level as percentage and Charge status.
 */
export function batteryLevel(params: BatteryLevelCommandParams = {}) {
  const batteryParams: BatteryLevelCommand['params'] = {
    bh: ScannerHelper.booleanParameter(params.batteryHealth),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.BATTERY_LEVEL} ${ScannerHelper.parseParamsToText(batteryParams)}`
  )
}
