import { UserSinglePressCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type UserDefinedSinglePressActionCommandParams = {
  /** Set the user action */
  userAction?: UserSinglePressCommand['params']['s']
}

/**
 * Reads or sets the single press user action used when “.sa -s usr” is configured.
 */
export function userDefinedSinglePressAction(
  params: UserDefinedSinglePressActionCommandParams = {}
) {
  const userSinglePressParams: UserSinglePressCommand['params'] = {
    s: params.userAction,
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.USER_SINGLE_PRESS} ${ScannerHelper.parseParamsToText(userSinglePressParams)}`
  )
}
