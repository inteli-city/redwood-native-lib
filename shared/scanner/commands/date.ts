import { DateCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type DateCommandParams = {
  /** Set the date @template yymmdd */
  dateTime?: DateCommand['params']['s']
}

/**
 * Configures or sets the system date and time.
 */
export function date(params: DateCommandParams = {}) {
  const dateParams: DateCommand['params'] = {
    s: params.dateTime,
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.DATE} ${ScannerHelper.parseParamsToText(dateParams)}`
  )
}
