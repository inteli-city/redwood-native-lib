import { SwitchActionCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type SwitchActionCommandParams = {
  /** Turn asynchronous switch status reporting on or off. @default 'off' */
  asyncReporting?: SwitchActionCommand['params']['a']
  /** Set the double press switch action. @default 'ad' */
  doublePressAction?: SwitchActionCommand['params']['d']
  /** Turn haptic feedback on or off. @default 'off' */
  hapticFeedback?: SwitchActionCommand['params']['h']
  /** Sets the delay before the switch double press action is repeated when held. Value between 1 and 999 ms. @default 100 */
  doublePressRepeatDelay?: SwitchActionCommand['params']['rd']
  /** Sets the delay before the switch single press action is repeated when held. Value between 1 and 999 ms. @default 100 */
  singlePressRepeatDelay?: SwitchActionCommand['params']['rs']
  /** Set the single press switch action. @default 'ad' */
  singlePressAction?: SwitchActionCommand['params']['s']
  /** List the current parameter values. */
  listParams?: SwitchActionCommand['params']['p']
  /** Reset the parameters to defaults. */
  resetToDefault?: SwitchActionCommand['params']['x']
}

/**
 * Configures the switch actions (single/double press) and their respective parameters such as delays, feedback, and reporting.
 */
export function switchAction(params: SwitchActionCommandParams = {}) {
  const switchActionParams: SwitchActionCommand['params'] = {
    a: params.asyncReporting,
    d: params.doublePressAction,
    h: params.hapticFeedback,
    rd: params.doublePressRepeatDelay,
    rs: params.singlePressRepeatDelay,
    s: params.singlePressAction,
    p: params.listParams,
    x: params.resetToDefault,
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.SWITCH_ACTION} ${ScannerHelper.parseParamsToText(switchActionParams)}\n`
  )
}
