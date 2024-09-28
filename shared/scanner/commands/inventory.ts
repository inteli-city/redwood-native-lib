import { InventoryCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type InventoryCommandParams = {
  /** perform an alert after a successful inventory using the current alert parameters
  from the .al command @default 'on' */
  alert?: InventoryCommand['params']['al']

  /** Include EPC checksum response @default 'off' */
  checksum?: InventoryCommand['params']['c']

  /** Duplicate removal (where supported) @default 'off' */
  duplicateRemoval?: InventoryCommand['params']['dr']

  /** Include date time response @default 'off' */
  dateTime?: InventoryCommand['params']['dt']

  /** Include EPC PC information response @default 'off' */
  includePC?: InventoryCommand['params']['e']

  /** Impinj fast ID extension. If set, Transponders which support this feature will
 include their TID in the response */

  impinjFastIdExtension?: InventoryCommand['params']['fi']

  /** Filter out all but the strongest RSSI response */
  filterRSSI?: InventoryCommand['params']['fs']

  /** Include the phase response */
  includePhaseResponse?: InventoryCommand['params']['ic']

  /** Include the channel frequency response */
  includeChanelFrequencyResponse?: InventoryCommand['params']['ip']

  /** Include EPC response */
  includeEPC?: InventoryCommand['params']['ie']

  /** Inventory only, if set to on then no select will be performed before the inventory
  round is started */
  inventoryOnly?: InventoryCommand['params']['io']

  /** Index number each transponder response */
  indexNumber?: InventoryCommand['params']['ix']

  /** No action, just set the parameters */
  noAction?: InventoryCommand['params']['n']

  /** Output power in dBm, where nn is in the range 10 to 29 */
  outputPower?: InventoryCommand['params']['o']

  /** List the parameter and their current values */
  listParams?: InventoryCommand['params']['p']

  /** Query algorithm (fixed or dynamic) @default 'fix' */
  queryAlgorithm?: InventoryCommand['params']['qa']

  /** Query Select */
  querySelect?: InventoryCommand['params']['ql']

  /** Query Session */
  querySession?: InventoryCommand['params']['qs']

  /** Query Target */
  queryTarget?: InventoryCommand['params']['qt']

  /** Q value for fixed Q operations (0 to 15) */
  queryValue?: InventoryCommand['params']['qv']

  /** Include transponder RSSI in the response */
  includeRSSI?: InventoryCommand['params']['r']

  /** Select action */
  selectAction?: InventoryCommand['params']['sa']

  /** Bank to use for the select mask */
  selectBank?: InventoryCommand['params']['sb']

  /** Select mask data in 2 character ASCII Hex pairs padded to ensure full bytes */
  selectDataMask?: InventoryCommand['params']['sd']

  /** Length in bits of the select mask, where xx is a 2 character ASCII Hex value */
  selectDataMaskLength?: InventoryCommand['params']['sl']

  /** Number of bits from the start of the block to the start of the select mask, where
  xxxx is a 4 character ASCII Hex value */
  selectDataMaskOffset?: InventoryCommand['params']['so']

  /** Select target */
  selectTarget?: InventoryCommand['params']['st']

  /** Impinj tag focus extension. Only effective if qs=s1, qt=a and if supported by the
  transponder */
  impinjTagFocusExtension?: InventoryCommand['params']['tf']

  /** Reset parameters to defaults */
  resetToDefault?: InventoryCommand['params']['x']
}

/**
 * Performs an inventory of transponders within the read range of the reader.
 Returns an error if no transponders are found.
 */
export function inventory(params: InventoryCommandParams = {}) {
  const inventoryParams: InventoryCommand['params'] = {
    al: params.alert,
    c: params.checksum,
    dr: params.duplicateRemoval,
    dt: params.dateTime,
    e: params.includePC,
    fi: params.impinjFastIdExtension,
    fs: params.filterRSSI,
    ic: params.includePhaseResponse,
    ip: params.includeChanelFrequencyResponse,
    ie: params.includeEPC,
    io: params.inventoryOnly,
    ix: params.indexNumber,
    n: ScannerHelper.booleanParameter(params.noAction),
    o: ScannerHelper.rangeParameter(params.outputPower, 10, 29),
    p: ScannerHelper.booleanParameter(params.listParams),
    qa: params.queryAlgorithm,
    ql: params.querySelect,
    qs: params.querySession,
    qt: params.queryTarget,
    qv: ScannerHelper.rangeParameter(params.queryValue, 0, 15),
    r: params.includeRSSI,
    sa: params.selectAction,
    sb: params.selectBank,
    sd: params.selectDataMask,
    sl: params.selectDataMaskLength,
    so: params.selectDataMaskOffset,
    st: params.selectTarget,
    tf: params.impinjTagFocusExtension,
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.INVENTORY} ${ScannerHelper.parseParamsToText(inventoryParams)}`
  )
}
