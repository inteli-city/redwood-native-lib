import { COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

/**
 * Reads the version information from the reader.
 */
export function versionInformation() {
  return ScannerHelper.createASCIICommand(`${COMMAND_NAME.VERSION}`)
}
