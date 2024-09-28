import { FindTagCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type FindTagCommandParams = {
  /** Perform an alert (tone or beep) when the tag is found. @default 'on' */
  alert?: FindTagCommand['params']['al']
  /** Include date/time response. @default 'off' */
  dateTime?: FindTagCommand['params']['dt']
  /** Include the EPC response. @default 'on' */
  includeEPC?: FindTagCommand['params']['ie']
  /** Include transponder RSSI as a percentage of min/max. @default 'on' */
  includeRSSIPercentage?: FindTagCommand['params']['ip']
  /** Volume level for the alert tone. Options: low, med, hig. @default 'hig' */
  volumeLevel?: FindTagCommand['params']['l']
  /** No action, just set the parameters. */
  noAction?: FindTagCommand['params']['n']
  /** Output power in dBm (range: 4 to 30). @default 30 */
  outputPower?: FindTagCommand['params']['o']
  /** List current parameter values. */
  listParams?: FindTagCommand['params']['p']
  /** Include transponder RSSI response. @default 'off' */
  includeRSSI?: FindTagCommand['params']['r']
  /** Bank to use for the select mask. Options: epc, tid, usr. @default 'epc' */
  selectBank?: FindTagCommand['params']['sb']
  /** Select mask data in 2-character ASCII hex pairs. */
  selectMaskData?: FindTagCommand['params']['sd']
  /** Length of the select mask in bits. */
  selectMaskLength?: FindTagCommand['params']['sl']
  /** Offset for the select mask. */
  selectMaskOffset?: FindTagCommand['params']['so']
  /** Arm or disarm find tag using the trigger. Options: art (arm), op (disarm). */
  triggerState?: FindTagCommand['params']['st']
  /** Sound percentage threshold 1 for beeps and tone. Range: 0 to 90. */
  soundThreshold1?: FindTagCommand['params']['t1']
  /** Sound percentage threshold 2 for beeps only. Range: 0 to 90. */
  soundThreshold2?: FindTagCommand['params']['t2']
  /** Sound percentage threshold 3 for beeps only. Range: 0 to 90. */
  soundThreshold3?: FindTagCommand['params']['t3']
  /** Variable tone frequency or variable beep speed. @default 'on' */
  variableToneOrBeep?: FindTagCommand['params']['to']
  /** Reset the parameters to defaults. */
  resetToDefault?: FindTagCommand['params']['x']
}

/**
 * Configures or performs the FindTag command. This command helps find a transponder using the reader.
 * @param params The parameters for the FindTag command.
 * - `alert`: Perform an alert when the tag is found (default: 'on').
 * - `dateTime`: Include date/time in the response (default: 'off').
 * - `includeEPC`: Include the EPC response (default: 'on').
 * - `includeRSSIPercentage`: Include transponder RSSI as a percentage (default: 'on').
 * - `volumeLevel`: Set volume level for the alert tone (default: 'hig').
 * - `outputPower`: Set output power in dBm (default: 30).
 * - `includeRSSI`: Include the transponder RSSI response (default: 'off').
 * - `selectBank`: Bank to use for the select mask (default: 'epc').
 * - Other options include setting thresholds for alert beeps, trigger state, and reset options.
 */
export function findTag(params: FindTagCommandParams = {}) {
  const findTagParams: FindTagCommand['params'] = {
    al: params.alert,
    dt: params.dateTime,
    ie: params.includeEPC,
    ip: params.includeRSSIPercentage,
    l: params.volumeLevel,
    n: ScannerHelper.booleanParameter(params.noAction),
    o: ScannerHelper.rangeParameter(params.outputPower, 4, 30),
    p: ScannerHelper.booleanParameter(params.listParams),
    r: params.includeRSSI,
    sb: params.selectBank,
    sd: params.selectMaskData,
    sl: params.selectMaskLength,
    so: params.selectMaskOffset,
    st: params.triggerState,
    t1: params.soundThreshold1,
    t2: params.soundThreshold2,
    t3: params.soundThreshold3,
    to: params.variableToneOrBeep,
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.FIND_TAG} ${ScannerHelper.parseParamsToText(findTagParams)}`
  )
}
