import { AlertCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type AlertCommandParams = {
  /** Buzzer on or off @default 'on'*/
  buzzer?: AlertCommand['params']['b']
  /** Buzzer/Vibrate duration: short, medium, or long @default 'sho' */
  buzzerDuration?: AlertCommand['params']['d']
  /** Plays "Find-Me" tune */
  playTune?: AlertCommand['params']['fm']
  /** Volume level: low, medium, or high @default 'hig'*/
  volumeLevel?: AlertCommand['params']['l']
  /** No action, just set the parameters */
  noAction?: AlertCommand['params']['n']
  /** List the current parameter values */
  listParams?: AlertCommand['params']['p']
  /** Buzzer tone: low, medium, or high @default 'hig' */
  buzzerTone?: AlertCommand['params']['t']
  /**Vibrate on or off @default 'on' */
  vibrate?: AlertCommand['params']['v']
  /** Reset the parameters to defaults */
  resetToDefault?: AlertCommand['params']['x']
}

/**
 * Configures and alerts the user. Returns an error if both vibrate and buzzer are off.
 */
export function alert(params: AlertCommandParams = {}) {
  const alertParams: AlertCommand['params'] = {
    b: params.buzzer,
    d: params.buzzerDuration,
    fm: params.playTune,
    l: params.volumeLevel,
    n: params.noAction,
    p: params.listParams,
    t: params.buzzerTone,
    v: params.vibrate,
    x: params.resetToDefault,
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.ALERT} ${ScannerHelper.parseParamsToText(alertParams)}\n`
  )
}
