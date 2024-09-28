import { AutorunCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type AutorunCommandParams = {
  deleteFile?: AutorunCommand['params']['d']
  /** Execute specified autorun file */
  file?: AutorunCommand['params']['ea']
  /** Select autorun file (0=internal, 1=SD card) @default 1 */
  selectFile?: AutorunCommand['params']['fi']
  /** Read specified autorun file */
  readFile?: AutorunCommand['params']['ra']
  /** Append command to the specified autorun file */
  executeCommand?: AutorunCommand['params']['wa']
  /** Resets the parameters to defaults */
  resetToDefault?: AutorunCommand['params']['x']
}

/**
 * If supported by the reader, this command is used to read/write/delete/execute the AUTO.TXT file on the SD card,
 or the readers small, internal file. This command cannot be used in an Autorun file.
 NB The internal file is limited to 256 bytes.
 */
export function autorun(params: AutorunCommandParams = {}) {
  const autorunParams: AutorunCommand['params'] = {
    d: ScannerHelper.booleanParameter(params.deleteFile),
    ea: ScannerHelper.booleanParameter(params.file),
    fi: params.selectFile,
    ra: ScannerHelper.booleanParameter(params.readFile),
    wa: ScannerHelper.quotedParameter(params.executeCommand),
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.AUTORUN} ${ScannerHelper.parseParamsToText(autorunParams)}`
  )
}
