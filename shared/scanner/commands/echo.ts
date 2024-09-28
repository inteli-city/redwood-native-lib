import { EchoCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type EchoCommandParams = {
  /** Echo feature on or off @default 'off' */
  enableEcho?: EchoCommand['params']['e']
  /** No action, just set the parameters */
  noAction?: EchoCommand['params']['p']
  /** Reset parameters */
  resetToDefault?: EchoCommand['params']['x']
}

/**
 * Echoes the command back as part of the response.
 */
export function echo(params: EchoCommandParams = {}) {
  const echoParams: EchoCommand['params'] = {
    e: params.enableEcho,
    p: ScannerHelper.booleanParameter(params.noAction),
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.ECHO} ${ScannerHelper.parseParamsToText(echoParams)}`
  )
}
