import { BarCodeCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type BarCodeCommandParams = {
  /** perform an alert after a successful barcode read using the current alert
 parameters from the .al command @default 'on' */
  alert?: BarCodeCommand['params']['al']
  /** Include date time response @default 'off'' */
  dateTime?: BarCodeCommand['params']['dt']
  /** Use escape character 0x1B to precede <CR>, <LF> and itself @default "on"*/
  useEscapeCharacter?: BarCodeCommand['params']['e']
  /** No action, just set the parameters */
  noAction?: BarCodeCommand['params']['n']
  /** List the current parameter values */
  listParams?: BarCodeCommand['params']['p']
  /** Read duration in seconds @default 9 */
  readDuration?: BarCodeCommand['params']['t']
  /** Reset the parameters to defaults */
  resetToDefault?: BarCodeCommand['params']['x']
}

/**
 * Initiates a barcode read.
 * Returns an error if no barcode is read.
 */
export function barCode(params: BarCodeCommandParams = {}) {
  const barcodeParams: BarCodeCommand['params'] = {
    al: params.alert,
    dt: params.dateTime,
    e: params.useEscapeCharacter,
    n: ScannerHelper.booleanParameter(params.noAction),
    p: ScannerHelper.booleanParameter(params.listParams),
    t: params.readDuration ?? 5,
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.BARCODE} ${ScannerHelper.parseParamsToText(barcodeParams)}`
  )
}
