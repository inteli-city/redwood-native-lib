import {
  BlockPermalockTransponderCommand,
  COMMAND_NAME,
} from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type BlockPermalockTransponderCommandParams = {
  /** Perform an alert after a successful write using the current alert Parameters from the
  .al command @default 'on' */
  alert?: BlockPermalockTransponderCommand['params']['al']
  /** Access password, where xxxxxxxx is an 8 character ASCII Hex value @default '00000000' */
  accessPassword?: BlockPermalockTransponderCommand['params']['ap']
  /** Include EPC checksum response @default 'off' */
  includeEPCChecksum?: BlockPermalockTransponderCommand['params']['c']
  /**The mask data of blocks to lock in 4 character ASCII Hex words. Up to a maximum
  of 16 words */
  dataMask?: BlockPermalockTransponderCommand['params']['dm']
  /** Length in words of the data to read or write, where xx is a 2 character ASCII Hex
  value up to a maximum of 10hex @default '00' */
  dataLength?: BlockPermalockTransponderCommand['params']['dl']
  /** Mask data offset specifies the starting address for the mask, in units of 16
  manufacturer defined blocks, where xxxx is a 4 character ASCII Hex value @default '0000' */
  dataOffset?: BlockPermalockTransponderCommand['params']['do']
  /** Include date time response @default 'off' */
  dateTime?: BlockPermalockTransponderCommand['params']['dt']
  /** Include EPC PC information response @default 'off' */
  includeEPC?: BlockPermalockTransponderCommand['params']['e']
  /** Inventory only, if set to on then no select will be performed before the inventory
  round phase is started @default 'off' */
  inventoryOnly?: BlockPermalockTransponderCommand['params']['io']
  /** Index number each transponder response @default 'off' */
  includeIndex?: BlockPermalockTransponderCommand['params']['ix']
  /** Set the mode to either read (rd) the block permalock status or write (wr) the block
  permalock bits @default 'rd' */
  mode?: BlockPermalockTransponderCommand['params']['m']
  /** No action, just set the parameters */
  noAction?: BlockPermalockTransponderCommand['params']['n']
  /** Output power in dBm, where nn is in the range 10 to 29 @default 29 */
  outputPower?: BlockPermalockTransponderCommand['params']['o']
  /** List the parameter and their current values */
  listParams?: BlockPermalockTransponderCommand['params']['p']

  /** Query Select @default 'all' */
  querySelect?: BlockPermalockTransponderCommand['params']['ql']
  /** Query Session @default 's2' */
  querySession?: BlockPermalockTransponderCommand['params']['qs']
  /** Query Target @default 'b' */
  queryTarget?: BlockPermalockTransponderCommand['params']['qt']
  /** Query Target @default 4 */
  queryValue?: BlockPermalockTransponderCommand['params']['qv']

  /** Include transponder RSSI response @default 'off' */
  includeRSSI?: BlockPermalockTransponderCommand['params']['r']

  /** Select action @default 4 */
  selectAction?: BlockPermalockTransponderCommand['params']['sa']

  /** Bank to use for the select mask @default 'epc' */
  selectBank?: BlockPermalockTransponderCommand['params']['sb']
  /** Select mask data in 2 character ASCII Hex bytes padded to ensure full bytes, up
  to a maximum of 32 bytes. */
  selectMaskData?: BlockPermalockTransponderCommand['params']['sd']

  /** Length in bits of the select mask, where xx is a 2 character ASCII Hex value @default 00 */
  selectMaskLength?: BlockPermalockTransponderCommand['params']['sl']
  /** Number of bits from the start of the block to the start of the select mask, where
  xxxx is a 4 character ASCII Hex value @default '0000' */
  selectMaskOffset?: BlockPermalockTransponderCommand['params']['so']

  /** Select target @default 's2' */
  selectTarget?: BlockPermalockTransponderCommand['params']['st']
  /** Reset parameters */
  resetToDefault?: BlockPermalockTransponderCommand['params']['x']
}

/**
 * This command is used to read or write the block permalock status on supported transponders. Block permalock is an optional command in the Class 1 Generation 2 Air Protocol so requires both the reader and the transponder to support the block permalock command for it to be used.
 *
 * With block permalock the user memory of a transponder is split into several manufacturer defined blocks. These blocks each have a write protect bit which can be set but NOT reset (hence permalock). The block permalock command can be used to read the status of these permalock flags or to write them.
 *
 * To read the permalock flags specify the start index offset (-do) and the number of blocks (-dl) to read the status of.
 *
 * The returned data is a bit pattern of lock status, 1 for locked 0 for not locked.
 *
 * To write the permalock flags specify the start index offset (-do), the number of blocks (-dl), the mask of the blocks to lock (-dm).
 *
 * Setting the bit index for the block permalock to 1 will permalock the block, setting to 0 will leave the block in its current state (permalocked or not)
 */
export function blockPermalockTransponder(
  params: BlockPermalockTransponderCommandParams = {}
) {
  const blockPermalockParams: BlockPermalockTransponderCommand['params'] = {
    al: params.alert,
    ap: params.accessPassword,
    c: params.includeEPCChecksum,
    dm: params.dataMask,
    dl: params.dataLength,
    do: params.dataOffset,
    dt: params.dateTime,
    e: params.includeEPC,
    io: params.inventoryOnly,
    ix: params.includeIndex,
    m: params.mode,
    n: params.noAction,
    o: params.outputPower,
    ql: params.querySelect,
    qs: params.querySession,
    qt: params.queryTarget,
    qv: params.queryValue,
    r: params.includeRSSI,
    sa: params.selectAction,
    sb: params.selectBank,
    sd: params.selectMaskData,
    sl: params.selectMaskLength,
    so: params.selectMaskOffset,
    st: params.selectTarget,
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.BLOCK_PERMALOCK_TRANSPONDER} ${ScannerHelper.parseParamsToText(blockPermalockParams)}`
  )
}
