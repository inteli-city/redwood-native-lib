import { ExecuteAutorunCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

/**
 * This command will force the autorun file to run.
 * @deprecated
 */
export function executeAutorun() {
  const executeParams: ExecuteAutorunCommand['params'] = {}

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.EXECUTE_AUTORUN} ${ScannerHelper.parseParamsToText(executeParams)}`
  )
}
