import { AbortCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

/**
 * Abort command terminates the current command and any pending commands.
 * It also stops any software switch presses that are in progress.
 */
export function abort() {
  const abortCommand: AbortCommand['params'] = {}

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.ABORT} ${ScannerHelper.parseParamsToText(abortCommand)}`
  )
}
