import { HIDSinglePressCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type HIDSinglePressCommandParams = {
  /** Header key codes that precede a Barcode */
  barcodeHeader?: HIDSinglePressCommand['params']['bh']
  /** Termination key codes that follow a Barcode */
  barcodeTerminator?: HIDSinglePressCommand['params']['bt']
  /** Header key codes that precede transponder data */
  transponderDataHeader?: HIDSinglePressCommand['params']['dh']
  /** Termination key codes that follow transponder data */
  transponderDataTerminator?: HIDSinglePressCommand['params']['dt']
  /** Header key codes that precede transponder EPC */
  epcHeader?: HIDSinglePressCommand['params']['eh']
  /** Termination key codes that follow transponder EPC */
  epcTerminator?: HIDSinglePressCommand['params']['et']
  /** Determines how transponder data is sent: ASCII text or raw ASCII hex @default 'asc' */
  transponderDataFormat?: HIDSinglePressCommand['params']['td']
  /** No action, just set the parameters */
  noAction?: HIDSinglePressCommand['params']['p']
  /** Reset parameters to defaults */
  resetToDefault?: HIDSinglePressCommand['params']['x']
}

/**
 * Controls how data is presented when Bluetooth® is configured for HID by the .bt command. Single press switch action.
 */
export function hidSinglePress(params: HIDSinglePressCommandParams = {}) {
  const hidSinglePressParams: HIDSinglePressCommand['params'] = {
    bh: params.barcodeHeader,
    bt: params.barcodeTerminator,
    dh: params.transponderDataHeader,
    dt: params.transponderDataTerminator,
    eh: params.epcHeader,
    et: params.epcTerminator,
    td: params.transponderDataFormat ?? 'asc',
    p: params.noAction,
    x: params.resetToDefault,
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.HID_SINGLE_PRESS} ${ScannerHelper.parseParamsToText(hidSinglePressParams)}`
  )
}
