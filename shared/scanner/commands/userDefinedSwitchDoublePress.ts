import { DoublePressActionCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type UserDefinedDoublePressAction = {
  /** Set the user action */
  actionID?: DoublePressActionCommand['params']['s']
}

/**
 * Reads or sets the double press user action used when “.sa -d usr” is configured
 */
export function userDefinedDoublePressAction(
  params: UserDefinedDoublePressAction = {}
) {
  const doublePressParams: DoublePressActionCommand['params'] = {
    s: params.actionID,
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.DOUBLE_PRESS_ACTION} ${ScannerHelper.parseParamsToText(doublePressParams)}`
  )
}
