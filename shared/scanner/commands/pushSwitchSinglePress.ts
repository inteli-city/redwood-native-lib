import {
  PushSwitchSinglePressCommand,
  COMMAND_NAME,
} from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type PushSwitchSinglePressCommandParams = {
  /** No action, just set the parameters */
  noAction?: PushSwitchSinglePressCommand['params']['n']
  /** List the current parameter values */
  listParams?: PushSwitchSinglePressCommand['params']['p']
  /** Press duration in seconds (0-99) @default 5 */
  pressDuration?: PushSwitchSinglePressCommand['params']['t']
  /** Reset the parameters to defaults */
  resetToDefault?: PushSwitchSinglePressCommand['params']['x']
}

/**
 * Starts a timed software switch single press, this is equivalent to a single press and hold of the hardware
 witch. If the switch is already in use an error will be returned. If the duration is set to zero the switch
 press will continue until stopped with an abort command. If the switch action is set to barcode then the
 switch press will end on completion of the barcode read.
 */
export function pushSwitchSinglePress(
  params: PushSwitchSinglePressCommandParams = {}
) {
  const pushParams: PushSwitchSinglePressCommand['params'] = {
    n: ScannerHelper.booleanParameter(params.noAction),
    p: ScannerHelper.booleanParameter(params.listParams),
    t: params.pressDuration,
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.PUSH_SWITCH_SINGLE_PRESS} ${ScannerHelper.parseParamsToText(pushParams)}`
  )
}
