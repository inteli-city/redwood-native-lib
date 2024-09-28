import {
  PushSwitchDoublePressCommand,
  COMMAND_NAME,
} from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type PushSwitchDoublePressCommandParams = {
  /** No action, just set the parameters */
  noAction?: PushSwitchDoublePressCommand['params']['n']
  /** List the current parameter values */
  listParams?: PushSwitchDoublePressCommand['params']['p']
  /** Press duration in seconds (0-99) @default 5 */
  pressDuration?: PushSwitchDoublePressCommand['params']['t']
  /** Reset the parameters to defaults */
  resetToDefault?: PushSwitchDoublePressCommand['params']['x']
}

/**
 * Starts a timed software switch double press, this is equivalent to a double press and hold of the hardware
 switch. If the switch is already in use an error will be returned. If the duration is set to zero the switch
 press will continue until stopped with an abort command. If the switch action is set to barcode then the
 switch press will end on completion of the barcode read.
 */
export function pushSwitchDoublePress(
  params: PushSwitchDoublePressCommandParams = {}
) {
  const pushParams: PushSwitchDoublePressCommand['params'] = {
    n: ScannerHelper.booleanParameter(params.noAction),
    p: ScannerHelper.booleanParameter(params.listParams),
    t: params.pressDuration,
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.PUSH_SWITCH_DOUBLE_PRESS} ${ScannerHelper.parseParamsToText(pushParams)}`
  )
}
