export const COMMAND_NAME = {
  ABORT: '.ab',
  ALERT: '.al',
  AUTORUN: '.ar',
  BARCODE: '.bc',
  BATTERY_LEVEL: '.bl',
  BLOCK_PERMALOCK_TRANSPONDER: '.bp',
  BLUETOOTH: '.bt',
  DATE: '.da',
  DOUBLE_PRESS_ACTION: '.dp',
  EXECUTE_AUTORUN: '.ea',
  ECHO: '.ec',
  FACTORY_DEFAULTS: '.fd',
  FIND_TAG: '.ft',
  HID_CONFIG: '.hc',
  HID_DOUBLE_PRESS: '.hd',
  HID_SINGLE_PRESS: '.hs',
  INVENTORY: '.iv',
  KILL: '.ki',
  LICENSE_KEY: '.lk',
  LOCK: '.lo',
  MOUNT_MEMORY: '.mt',
  PUSH_SWITCH_DOUBLE_PRESS: '.pd',
  PUSH_SWITCH_SINGLE_PRESS: '.ps',
  READ_AUTORUN: '.ra',
  READ_TRANSPONDER: '.rd',
  READ_LOG: '.rl',
  SWITCH_ACTION: '.sa',
  SERIAL_HID: '.sh',
  SLEEP: '.sl',
  USER_SINGLE_PRESS: '.sp',
  SHOW_REGION: '.sr',
  SWITCH_STATE: '.ss',
  SLEEP_TIMEOUT: '.st',
  TIME: '.tm',
  TRANSPONDER_SELECT: '.ts',
  VERSION: '.vr',
  WRITE_AUTORUN: '.wa',
  WRITE_TRANSPONDER: '.wr',
  WRITE_SINGLE_TRANSPONDER: '.ws',
} as const

export type CommandName = (typeof COMMAND_NAME)[keyof typeof COMMAND_NAME]

/**
 * Abort command terminates the current command and any pending command_NAME.
 * It also stops any software switch presses that are in progress.
 * No parameters are used for this command.
 */
export type AbortCommand = {
  type: typeof COMMAND_NAME.ABORT
  params: {}
}
/**
 * Configures and alerts the user. Returns an error if both vibrate and buzzer are off.
 */
export type AlertCommand = {
  type: typeof COMMAND_NAME.ALERT
  params: {
    b?: 'on' | 'off'
    d?: 'sho' | 'med' | 'lon'
    fm?: boolean
    l?: 'low' | 'med' | 'hig'
    n?: boolean
    p?: boolean
    t?: 'low' | 'med' | 'hig'
    v?: 'on' | 'off'
    x?: boolean
  }
}

/**
 * Executes or configures an autorun action.
 */
export type AutorunCommand = {
  type: typeof COMMAND_NAME.AUTORUN
  params: {
    d?: boolean
    ea?: boolean
    fi?: 0 | 1
    ra?: boolean
    wa?: string
    x?: boolean
  }
}

/**
 * Performs or configures the Barcode command.
 */
export type BarCodeCommand = {
  type: typeof COMMAND_NAME.BARCODE
  params: {
    al?: 'on' | 'off'
    dt?: 'on' | 'off'
    e?: 'on' | 'off'
    n?: boolean
    p?: boolean
    t?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    x?: boolean
  }
}

/**
 * Provides the battery level of the device.
 */
export type BatteryLevelCommand = {
  type: typeof COMMAND_NAME.BATTERY_LEVEL
  params: {
    bh?: boolean
  }
}

/**
 * Configures a transponder as Block Permalock.
 */
export type BlockPermalockTransponderCommand = {
  type: typeof COMMAND_NAME.BLOCK_PERMALOCK_TRANSPONDER
  params: {
    al?: 'on' | 'off'
    ap?: string
    c?: 'on' | 'off'
    dm?: string
    dl?: string
    do?: string
    dt?: 'on' | 'off'
    e?: 'on' | 'off'
    io?: 'on' | 'off'
    ix?: 'on' | 'off'
    m?: 'rd' | 'wr'
    n?: boolean
    o?: number
    p?: boolean
    ql?: 'all' | 'nsl' | 'sl'
    qs?: 's0' | 's1' | 's2' | 's3'
    qt?: 'a' | 'b'
    qv?: number
    r?: 'on' | 'off'
    sa?: number
    sb?: 'epc' | 'tid' | 'usr'
    sd?: string
    sl?: string
    so?: string
    st?: 's0' | 's1' | 's2' | 's3' | 'sl'
    x?: boolean
  }
}

/**
 * Configures Bluetooth® functions for the device.
 */
export type BluetoothCommand = {
  type: typeof COMMAND_NAME.BLUETOOTH
  params: {
    /** Bluetooth ID */
    bi?: string
    /** Enable or disable Bluetooth */
    e?: 'on' | 'off'
    /** Bluetooth security mode */
    bs?: string
    /** Bluetooth friendly name */
    f?: string
    /** Bluetooth mode: spp, hid, or hii */
    m?: 'spp' | 'hid' | 'hii'
    /** No action, just set the parameters */
    p?: boolean
    /** Write Bluetooth settings */
    w?: string
    /** Reset the parameters */
    x?: boolean
  }
}

/**
 * Configures or sets the system date and time.
 */
export type DateCommand = {
  type: typeof COMMAND_NAME.DATE
  params: {
    /** Sets the date and time in the format YYYY-MM-DDThh:mm:ss */
    s?: string
  }
}

/**
 * Configures a user-defined switch double press action.
 */
export type DoublePressActionCommand = {
  type: typeof COMMAND_NAME.DOUBLE_PRESS_ACTION
  params: {
    /** Action ID to assign to the double press event */
    s?: string
  }
}

/**
 * Deprecated. Executes an autorun action if present.
 */
export type ExecuteAutorunCommand = {
  type: typeof COMMAND_NAME.EXECUTE_AUTORUN
  params: {}
}

/**
 * Echoes the command back as part of the response.
 */
export type EchoCommand = {
  type: typeof COMMAND_NAME.ECHO
  params: {
    /** Echo feature on or off */
    e?: 'on' | 'off'
    /** No action, just set the parameters */
    p?: boolean
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Restores all command parameters to their default settings.
 */
export type FactoryDefaultsCommand = {
  type: typeof COMMAND_NAME.FACTORY_DEFAULTS
  params: {
    /** ePopLoq mode: Charge Only / Charge and Data */
    ep?: 'co' | 'cd'
    /** List the current parameter values */
    p?: boolean
    /** Reset all command parameters to defaults */
    x?: boolean
  }
}

/**
 * Performs/configures find transponder using the reader.
 * When armed, use the trigger to start/stop finding and double-click to disarm.
 */
export type FindTagCommand = {
  type: typeof COMMAND_NAME.FIND_TAG
  params: {
    /** Perform an alert (tone or beep) when tag is found. @default 'on' */
    al?: 'on' | 'off'
    /** Include date/time response. @default 'off' */
    dt?: 'on' | 'off'
    /** Include the EPC response. @default 'on' */
    ie?: 'on' | 'off'
    /** Include transponder RSSI as a percentage of min/max. @default 'on' */
    ip?: 'on' | 'off'
    /** Volume level for the alert tone. Options: low, med, hig. @default 'hig' */
    l?: 'low' | 'med' | 'hig'
    /** No action, just set the parameters. */
    n?: boolean
    /** Output power in dBm (range: 4 to 30). @default 30 */
    o?: number
    /** List current parameter values. */
    p?: boolean
    /** Include transponder RSSI response. @default 'off' */
    r?: 'on' | 'off'
    /** Bank to use for the select mask. Options: epc, tid, usr. @default 'epc' */
    sb?: 'epc' | 'tid' | 'usr'
    /** Select mask data in 2-character ASCII hex pairs. */
    sd?: string
    /** Length of the select mask in bits. */
    sl?: string
    /** Offset for the select mask. */
    so?: string
    /** Arm or disarm find tag using the trigger. Options: art (arm), op (disarm). */
    st?: 'art' | 'op'
    /** Sound percentage threshold 1 for beeps and tone. Range: 0 to 90. */
    t1?: number
    /** Sound percentage threshold 2 for beeps only. Range: 0 to 90. */
    t2?: number
    /** Sound percentage threshold 3 for beeps only. Range: 0 to 90. */
    t3?: number
    /** Variable tone frequency or variable beep speed. @default 'on' */
    to?: 'on' | 'off'
    /** Reset the parameters to defaults. */
    x?: boolean
  }
}

/**
 * Defines settings for HID.
 */
export type HIDConfigCommand = {
  type: typeof COMMAND_NAME.HID_CONFIG
  params: {
    /** Sets the delay between characters sent via HID (0 to 999 ms) */
    cd?: number
    /** Sets the HID keyboard region (or default) */
    kb?: 'rr' | 'def'
    /** List the current parameter values */
    p?: boolean
    /** Sets the trigger mode (0: Single shot, 1: Read until success, 2: While pressed) */
    tm?: 0 | 1 | 2
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Controls how data is presented when Bluetooth® is configured for HID by the .bt command. Double press switch action.
 */
export type HIDDoublePressCommand = {
  type: typeof COMMAND_NAME.HID_DOUBLE_PRESS
  params: {
    /** Header key codes that precede a Barcode */
    bh?: string
    /** Termination key codes that follow a Barcode */
    bt?: string
    /** Header key codes that precede transponder data */
    dh?: string
    /** Termination key codes that follow transponder data */
    dt?: string
    /** Header key codes that precede transponder EPC */
    eh?: string
    /** Termination key codes that follow transponder EPC */
    et?: string
    /** Header key codes that precede an inventory cycle */
    ih?: string
    /** Termination key codes that follow an inventory cycle */
    it?: string
    /** List the current parameter values */
    p?: boolean
    /** Determines how transponder data is sent (asc: ASCII text, hex: raw ASCII hex) */
    td?: 'asc' | 'hex'
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Controls how data is presented when Bluetooth® is configured for HID by the .bt command. Single press switch action.
 */
export type HIDSinglePressCommand = {
  type: typeof COMMAND_NAME.HID_SINGLE_PRESS
  params: {
    /** Header key codes that precede a Barcode */
    bh?: string
    /** Termination key codes that follow a Barcode */
    bt?: string
    /** Header key codes that precede transponder data */
    dh?: string
    /** Termination key codes that follow transponder data */
    dt?: string
    /** Header key codes that precede transponder EPC */
    eh?: string
    /** Termination key codes that follow transponder EPC */
    et?: string
    /** Header key codes that precede an inventory cycle */
    ih?: string
    /** Termination key codes that follow an inventory cycle */
    it?: string
    /** List the current parameter values */
    p?: boolean
    /** Determines how transponder data is sent (asc: ASCII text, hex: raw ASCII hex) */
    td?: 'asc' | 'hex'
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Performs an inventory of transponders within the read range of the reader. Returns an error if no transponders are found.
 */
export type InventoryCommand = {
  type: typeof COMMAND_NAME.INVENTORY
  params: {
    /** Perform an alert after a successful inventory */
    al?: 'on' | 'off'
    /** Include EPC checksum response */
    c?: 'on' | 'off'
    /** Duplicate removal */
    dr?: 'off' | 'on' | 'rnd' | 'clr'
    /** Include date time response */
    dt?: 'on' | 'off'
    /** Include EPC PC information response */
    e?: 'on' | 'off'
    /** Fast ID extension */
    fi?: 'on' | 'off'
    /** Filter out all but the strongest RSSI response */
    fs?: 'on' | 'off'
    /** Include phase response */
    ic?: 'on' | 'off'
    /** Include channel frequency response */
    ip?: 'on' | 'off'
    /** Include EPC response */
    ie?: 'on' | 'off'
    /** Inventory only, no select performed before the round phase */
    io?: 'on' | 'off'
    /** Index number each transponder response */
    ix?: 'on' | 'off'
    /**  */
    n?: boolean
    /** Output power in dBm (10 to 29) */
    o?: number
    /** List the parameter and their current values */
    p?: boolean
    /** Q algorithm */
    qa?: 'fix' | 'dyn'
    /** query Select */
    ql?: 'all' | 'nsl' | 'sl'
    /** query Session */
    qs?: 's0' | 's1' | 's2' | 's3'
    /** query Target */
    qt?: 'a' | 'b'
    /** Q value for fixed Q operations (0 to 15) */
    qv?: number
    /** Include transponder RSSI response */
    r?: 'on' | 'off'
    /** Select action */
    sa?: number
    /** Bank to use for the select mask */
    sb?: 'epc' | 'tid' | 'usr'
    /** Select mask data in 2 character ASCII Hex pairs */
    sd?: string
    /** Length in bits of the select mask */
    sl?: string
    /** Number of bits from the start of the block to the start of the select mask */
    so?: string
    /** Select target */
    st?: 's0' | 's1' | 's2' | 's3' | 'sl'
    /** Tag focus extension */
    tf?: 'on' | 'off'
    /** Reset the parameters to defaults */
    x?: boolean
  }
}
/**
 * This command is used to kill transponders. The selected transponders with matching access and kill passwords will be permanently killed.
 */
export type KillCommand = {
  type: typeof COMMAND_NAME.KILL
  params: {
    /** Access password (8 character ASCII Hex value) */
    ap?: string
    /** Include EPC checksum response */
    c?: 'on' | 'off'
    /** Include date time response */
    dt?: 'on' | 'off'
    /** Include EPC PC information response */
    e?: 'on' | 'off'
    /** Inventory only, no select performed before the round phase */
    io?: 'on' | 'off'
    /** Index number each transponder response */
    ix?: 'on' | 'off'
    /** Kill password (8 character ASCII Hex value) */
    kp?: string
    /** No action, just set the parameters */
    n?: boolean
    /** Output power in dBm (10 to 29) */
    o?: number
    /** List the parameter and their current values */
    p?: boolean
    /** query Select */
    ql?: 'all' | 'nsl' | 'sl'
    /** query Session */
    qs?: 's0' | 's1' | 's2' | 's3'
    /** query Target */
    qt?: 'a' | 'b'
    /** Q value (0 to 15) */
    qv?: number
    /** Include transponder RSSI response */
    r?: 'on' | 'off'
    /** Select action */
    sa?: number
    /** Bank to use for the select mask */
    sb?: 'epc' | 'tid' | 'usr'
    /** Select mask data in 2 character ASCII Hex bytes */
    sd?: string
    /** Length in bits of the select mask */
    sl?: string
    /** Number of bits from the start of the block to the start of the select mask */
    so?: string
    /** Select target */
    st?: 's0' | 's1' | 's2' | 's3' | 'sl'
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Configures or validates the license key for the device.
 */
export type LicenseKeyCommand = {
  type: typeof COMMAND_NAME.LICENSE_KEY
  params: {
    /** Set the license key (32-character ASCII Hex string) */
    lk?: string
    /** No action, just set the parameters */
    p?: boolean
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Locks memory blocks in the transponder using a lock command.
 */
export type LockCommand = {
  type: typeof COMMAND_NAME.LOCK
  params: {
    /** Access password (8-character ASCII Hex string) */
    ap?: string
    /** Lock action */
    lk?: 'rd' | 'wr'
    /** No action, just set the parameters */
    n?: boolean
    /** Output power in dBm (10 to 29) */
    o?: number
    /** List the current parameter values */
    p?: boolean
    /** Query Select */
    ql?: 'all' | 'nsl' | 'sl'
    /** Query Session */
    qs?: 's0' | 's1' | 's2' | 's3'
    /** Query Target */
    qt?: 'a' | 'b'
    /** Query Value */
    qv?: number
    /** Include transponder RSSI response */
    r?: 'on' | 'off'
    /** Select action */
    sa?: number
    /** Bank to use for the select mask */
    sb?: 'epc' | 'tid' | 'usr'
    /** Select mask data in 2-character ASCII Hex */
    sd?: string
    /** Length in bits of the select mask */
    sl?: string
    /** Number of bits from the start of the block to the start of the select mask */
    so?: string
    /** Select target */
    st?: 's0' | 's1' | 's2' | 's3' | 'sl'
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Mounts or dismounts the internal memory of the device.
 */
export type MountMemoryCommand = {
  type: typeof COMMAND_NAME.MOUNT_MEMORY
  params: {
    /** Mount or dismount the internal memory */
    m?: 'mount' | 'dismount'
    /** List the current parameter values */
    p?: boolean
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Configures a user-defined push switch double press action.
 */
export type PushSwitchDoublePressCommand = {
  type: typeof COMMAND_NAME.PUSH_SWITCH_DOUBLE_PRESS
  params: {
    n?: boolean
    p?: boolean
    t?: number
    x?: boolean
  }
}

/**
 * Configures a user-defined push switch single press action.
 */
export type PushSwitchSinglePressCommand = {
  type: typeof COMMAND_NAME.PUSH_SWITCH_SINGLE_PRESS
  params: {
    n?: boolean
    p?: boolean
    t?: number
    x?: boolean
  }
}

/**
 * Deprecated. Reads the autorun file on the device.
 */
export type ReadAutoRunCommand = {
  type: typeof COMMAND_NAME.READ_AUTORUN
}

/**
 * Reads data from a transponder’s memory bank.
 */
export type ReadTransponderCommand = {
  type: typeof COMMAND_NAME.READ_TRANSPONDER
  params: {
    /** Access password (8-character ASCII Hex string) */
    ap?: string
    /** Include EPC checksum in the response */
    c?: 'on' | 'off'
    /** Include date/time in the response */
    dt?: 'on' | 'off'
    /** Include EPC PC information in the response */
    e?: 'on' | 'off'
    /** Inventory only, no select phase before reading */
    io?: 'on' | 'off'
    /** Index each transponder in the response */
    ix?: 'on' | 'off'
    /** Memory bank to read from (0: Reserved, 1: EPC, 2: TID, 3: User) */
    m?: 0 | 1 | 2 | 3
    /** No action, just set the parameters */
    n?: boolean
    /** Output power in dBm (10 to 29) */
    o?: number
    /** List the current parameter values */
    p?: boolean
    /** Query Select */
    ql?: 'all' | 'nsl' | 'sl'
    /** Query Session */
    qs?: 's0' | 's1' | 's2' | 's3'
    /** Query Target */
    qt?: 'a' | 'b'
    /** Query Value */
    qv?: number
    /** Read length (in words) */
    rl?: number
    /** Include transponder RSSI in the response */
    r?: 'on' | 'off'
    /** Start address (in words) */
    sa?: number
    /** Bank to use for the select mask */
    sb?: 'epc' | 'tid' | 'usr'
    /** Select mask data in ASCII Hex pairs */
    sd?: string
    /** Length of the select mask (in bits) */
    sl?: string
    /** Number of bits from the start of the block to the start of the select mask */
    so?: string
    /** Select target */
    st?: 's0' | 's1' | 's2' | 's3' | 'sl'
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Reads the log file on the device, if available.
 */
export type ReadLogCommand = {
  type: typeof COMMAND_NAME.READ_LOG
  params: {
    /** Output log in ASCII or Hex format */
    f?: 'asc' | 'hex'
    /** Maximum number of log entries to return */
    n?: number
    /** List the current parameter values */
    p?: boolean
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Configures or performs a switch action.
 */
export type SwitchActionCommand = {
  type: typeof COMMAND_NAME.SWITCH_ACTION
  params: {
    /** Turn asynchronous switch status reporting on or off. @default 'off' */
    a?: 'on' | 'off'
    /** Set the double press switch action. @default 'ad' */
    d?: string
    /** Turn haptic feedback on or off. @default 'off' */
    h?: 'on' | 'off'
    /** Sets the delay before the switch double press action is repeated when held. Value between 1 and 999 ms. @default 100 */
    rd?: number
    /** Sets the delay before the switch single press action is repeated when held. Value between 1 and 999 ms. @default 100 */
    rs?: number
    /** Set the single press switch action. @default 'ad' */
    s?: 'off' | 'rd' | 'wr' | 'inv' | 'bar' | 'usr' | 'ad'
    /** List the current parameter values. */
    p?: boolean
    /** Reset the parameters to defaults. */
    x?: boolean
  }
}

/**
 * Performs HID serial communication configuration.
 */
export type SerialHIDCommand = {
  type: typeof COMMAND_NAME.SERIAL_HID
  params: {
    /** Enable or disable HID serial */
    e?: 'on' | 'off'
    /** Sets the HID keyboard layout */
    k?: string
    /** List the current parameter values */
    p?: boolean
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Puts the device into a low-power sleep mode.
 */
export type SleepCommand = {
  type: typeof COMMAND_NAME.SLEEP
  params: {
    /** Timeout in seconds before the device automatically sleeps */
    t?: number
    /** List the current parameter values */
    p?: boolean
    /** Reset the parameters to defaults */
    x?: boolean
  }
}

/**
 * Configures a user-defined switch single press action.
 */
export type UserSinglePressCommand = {
  type: typeof COMMAND_NAME.USER_SINGLE_PRESS
  params: {
    /** Action ID for single press */
    s?: string
  }
}

/**
 * Shows the current region configuration of the device.
 */
export type ShowRegionCommand = {
  type: typeof COMMAND_NAME.SHOW_REGION
  params: {
    /** Displays the current region */
    p?: boolean
    /** Resets the region configuration to defaults */
    x?: boolean
  }
}

/**
 * Reads or sets the current switch state.
 */
export type SwitchStateCommand = {
  type: typeof COMMAND_NAME.SWITCH_STATE
  params: {
    /** Reads the current switch state */
    r?: boolean
    /** No action, just set the parameters */
    n?: boolean
    /** Displays the current parameter values */
    p?: boolean
    /** Resets the parameters to defaults */
    x?: boolean
  }
}

/**
 * Configures the sleep timeout for the device.
 */
export type SleepTimeoutCommand = {
  type: typeof COMMAND_NAME.SLEEP_TIMEOUT
  params: {
    /** Timeout value in seconds before the device sleeps */
    t?: number
    /** Displays the current parameter values */
    p?: boolean
    /** Resets the parameters to defaults */
    x?: boolean
  }
}

/**
 * Configures or reads the current time from the device.
 */
export type TimeCommand = {
  type: typeof COMMAND_NAME.TIME
  params: {
    /** Sets the current time in the format hh:mm:ss */
    s?: string
    /** Displays the current parameter values */
    p?: boolean
    /** Resets the parameters to defaults */
    x?: boolean
  }
}

/**
 * Selects a transponder based on a specific mask.
 */
export type TransponderSelectCommand = {
  type: typeof COMMAND_NAME.TRANSPONDER_SELECT
  params: {
    /** Access password (8-character ASCII Hex value) */
    ap?: string
    /** Include EPC checksum in the response */
    c?: 'on' | 'off'
    /** Include date/time in the response */
    dt?: 'on' | 'off'
    /** Include EPC PC information in the response */
    e?: 'on' | 'off'
    /** Inventory only, no select phase before the operation */
    io?: 'on' | 'off'
    /** Index each transponder in the response */
    ix?: 'on' | 'off'
    /** No action, just set the parameters */
    n?: boolean
    /** Output power in dBm (10 to 29) */
    o?: number
    /** Displays the current parameter values */
    p?: boolean
    /** Query Select */
    ql?: 'all' | 'nsl' | 'sl'
    /** Query Session */
    qs?: 's0' | 's1' | 's2' | 's3'
    /** Query Target */
    qt?: 'a' | 'b'
    /** Query Value */
    qv?: number
    /** Include transponder RSSI in the response */
    r?: 'on' | 'off'
    /** Select action */
    sa?: number
    /** Bank to use for the select mask */
    sb?: 'epc' | 'tid' | 'usr'
    /** Select mask data in ASCII Hex pairs */
    sd?: string
    /** Length of the select mask (in bits) */
    sl?: string
    /** Number of bits from the start of the block to the start of the select mask */
    so?: string
    /** Select target */
    st?: 's0' | 's1' | 's2' | 's3' | 'sl'
    /** Resets the parameters to defaults */
    x?: boolean
  }
}

/**
 * Retrieves version information about the device and firmware.
 */
export type VersionInformationCommand = {
  type: typeof COMMAND_NAME.VERSION
}
/**
 * Deprecated. Writes commands to the autorun file on the device.
 */
export type WriteAutoRunCommand = {
  type: typeof COMMAND_NAME.WRITE_AUTORUN
  params: {
    /** The autorun file to write to */
    wa?: string
    /** No action, just set the parameters */
    p?: boolean
    /** Resets the parameters to defaults */
    x?: boolean
  }
}

/**
 * Writes data to a transponder's memory bank.
 */
export type WriteTransponderCommand = {
  type: typeof COMMAND_NAME.WRITE_TRANSPONDER
  params: {
    /** Access password (8-character ASCII Hex) */
    ap?: string
    /** Include EPC checksum in response */
    c?: 'on' | 'off'
    /** Include date/time in response */
    dt?: 'on' | 'off'
    /** Include EPC PC information in response */
    e?: 'on' | 'off'
    /** Inventory only, no select phase before writing */
    io?: 'on' | 'off'
    /** Index each transponder in the response */
    ix?: 'on' | 'off'
    /** Memory bank to write to (0: Reserved, 1: EPC, 2: TID, 3: User) */
    m?: 0 | 1 | 2 | 3
    /** No action, just set the parameters */
    n?: boolean
    /** Output power in dBm (10 to 29) */
    o?: number
    /** Displays the current parameter values */
    p?: boolean
    /** Query Select */
    ql?: 'all' | 'nsl' | 'sl'
    /** Query Session */
    qs?: 's0' | 's1' | 's2' | 's3'
    /** Query Target */
    qt?: 'a' | 'b'
    /** Query Value */
    qv?: number
    /** Include transponder RSSI in response */
    r?: 'on' | 'off'
    /** Data to write (ASCII Hex pairs) */
    wr?: string
    /** Start address (in words) */
    sa?: number
    /** Bank to use for the select mask */
    sb?: 'epc' | 'tid' | 'usr'
    /** Select mask data in ASCII Hex pairs */
    sd?: string
    /** Length of the select mask (in bits) */
    sl?: string
    /** Number of bits from the start of the block to the start of the select mask */
    so?: string
    /** Select target */
    st?: 's0' | 's1' | 's2' | 's3' | 'sl'
    /** Resets the parameters to defaults */
    x?: boolean
  }
}

/**
 * Writes data to a single transponder's memory bank.
 */
export type WriteSingleTransponderCommand = {
  type: typeof COMMAND_NAME.WRITE_SINGLE_TRANSPONDER
  params: {
    /** Access password (8-character ASCII Hex) */
    ap?: string
    /** Include EPC checksum in response */
    c?: 'on' | 'off'
    /** Include date/time in response */
    dt?: 'on' | 'off'
    /** Include EPC PC information in response */
    e?: 'on' | 'off'
    /** Inventory only, no select phase before writing */
    io?: 'on' | 'off'
    /** Index each transponder in the response */
    ix?: 'on' | 'off'
    /** Memory bank to write to (0: Reserved, 1: EPC, 2: TID, 3: User) */
    m?: 0 | 1 | 2 | 3
    /** No action, just set the parameters */
    n?: boolean
    /** Output power in dBm (10 to 29) */
    o?: number
    /** Displays the current parameter values */
    p?: boolean
    /** Query Select */
    ql?: 'all' | 'nsl' | 'sl'
    /** Query Session */
    qs?: 's0' | 's1' | 's2' | 's3'
    /** Query Target */
    qt?: 'a' | 'b'
    /** Query Value */
    qv?: number
    /** Include transponder RSSI in response */
    r?: 'on' | 'off'
    /** Data to write (ASCII Hex pairs) */
    wr?: string
    /** Start address (in words) */
    sa?: number
    /** Resets the parameters to defaults */
    x?: boolean
  }
}

export type SensorCommand =
  | AbortCommand
  | AlertCommand
  | AutorunCommand
  | BarCodeCommand
  | BatteryLevelCommand
  | BlockPermalockTransponderCommand
  | BluetoothCommand
  | DateCommand
  | DoublePressActionCommand
  | ExecuteAutorunCommand
  | EchoCommand
  | FactoryDefaultsCommand
  | FindTagCommand
  | HIDConfigCommand
  | HIDDoublePressCommand
  | HIDSinglePressCommand
  | InventoryCommand
  | KillCommand
  | LicenseKeyCommand
  | LockCommand
  | MountMemoryCommand
  | PushSwitchDoublePressCommand
  | PushSwitchSinglePressCommand
  | ReadAutoRunCommand
  | ReadTransponderCommand
  | ReadLogCommand
  | SwitchActionCommand
  | SerialHIDCommand
  | SleepCommand
  | UserSinglePressCommand
  | ShowRegionCommand
  | SwitchStateCommand
  | SleepTimeoutCommand
  | TimeCommand
  | TransponderSelectCommand
  | VersionInformationCommand
  | WriteAutoRunCommand
  | WriteTransponderCommand
  | WriteSingleTransponderCommand
