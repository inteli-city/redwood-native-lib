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
 * Abort command, terminates the current command and any pending commands. It also stops any software
switch presses that are in progress.
 */
export type AbortCommand = {
  type: typeof COMMAND_NAME.ABORT
}
/**
 * Configures and alerts the user. Returns an error if vibrate and buzzer are both off.
 */
export type AlertCommand = {
  type: typeof COMMAND_NAME.ALERT

  params: {
    /**
     * Buzzer on or off
     */
    b?: 'on' | 'off'
    /**
     * Buzzer/Vibrate duration short, medium or long
     */
    d?: 'sho' | 'med' | 'lon'
    /**
     * Plays “Find-Me” tune
     */
    fm?: boolean
    /**
     * Volume level
     */
    l?: 'low' | 'med' | 'hig'
    /**
     * No action, just set the parameters
     */
    n?: boolean
    /**
     * List the current parameter values
     */
    p?: boolean
    /**
     * Buzzer tone low, medium or high
     */
    t?: 'low' | 'med' | 'hig'
    /**
     * Vibrate on or off
     */
    v?: 'on' | 'off'
    /**
     * Reset the parameters to defaults
     */
    x?: boolean
  }
}

export type AutorunCommand = {
  type: typeof COMMAND_NAME.AUTORUN
  params: {}
}

export type BarCodeCommand = {
  type: typeof COMMAND_NAME.BARCODE
  params: {}
}

export type BatteryLevelCommand = {
  type: typeof COMMAND_NAME.BATTERY_LEVEL
  params: {}
}

export type BlockPermalockTransponderCommand = {
  type: typeof COMMAND_NAME.BLOCK_PERMALOCK_TRANSPONDER
  params: {}
}

export type BluetoothCommand = {
  type: typeof COMMAND_NAME.BLUETOOTH
  params: {}
}

export type DateCommand = {
  type: typeof COMMAND_NAME.DATE
  params: {}
}

export type DoublePressActionCommand = {
  type: typeof COMMAND_NAME.DOUBLE_PRESS_ACTION
  params: {}
}

export type ExecuteAutorunCommand = {
  type: typeof COMMAND_NAME.EXECUTE_AUTORUN
  params: {}
}

export type EchoCommand = {
  type: typeof COMMAND_NAME.ECHO
  params: {}
}

export type FactoryDefaultsCommand = {
  type: typeof COMMAND_NAME.FACTORY_DEFAULTS
  params: {}
}

export type FindTagCommand = {
  type: typeof COMMAND_NAME.FIND_TAG
  params: {}
}

export type HidConfigCommand = {
  type: typeof COMMAND_NAME.HID_CONFIG
  params: {}
}

export type HidDoublePressCommand = {
  type: typeof COMMAND_NAME.HID_DOUBLE_PRESS
  params: {}
}

export type HidSinglePressCommand = {
  type: typeof COMMAND_NAME.HID_SINGLE_PRESS
  params: {}
}

export type InventoryCommand = {
  type: typeof COMMAND_NAME.INVENTORY
  params: {}
}

export type KillCommand = {
  type: typeof COMMAND_NAME.KILL
  params: {}
}

export type LicenseKeyCommand = {
  type: typeof COMMAND_NAME.LICENSE_KEY
  params: {}
}

export type LockCommand = {
  type: typeof COMMAND_NAME.LOCK
  params: {}
}

export type MountMemoryCommand = {
  type: typeof COMMAND_NAME.MOUNT_MEMORY
  params: {}
}

export type PushSwitchDoublePressCommand = {
  type: typeof COMMAND_NAME.PUSH_SWITCH_DOUBLE_PRESS
  params: {}
}

export type PushSwitchSinglePressCommand = {
  type: typeof COMMAND_NAME.PUSH_SWITCH_SINGLE_PRESS
  params: {}
}

export type ReadAutorunCommand = {
  type: typeof COMMAND_NAME.READ_AUTORUN
  params: {}
}

export type ReadTransponderCommand = {
  type: typeof COMMAND_NAME.READ_TRANSPONDER
  params: {}
}

export type ReadLogCommand = {
  type: typeof COMMAND_NAME.READ_LOG
  params: {}
}

export type SwitchActionCommand = {
  type: typeof COMMAND_NAME.SWITCH_ACTION
  params: {}
}

export type SerialHidCommand = {
  type: typeof COMMAND_NAME.SERIAL_HID
  params: {}
}

export type SleepCommand = {
  type: typeof COMMAND_NAME.SLEEP
  params: {}
}

export type UserSinglePressCommand = {
  type: typeof COMMAND_NAME.USER_SINGLE_PRESS
  params: {}
}

export type ShowRegionCommand = {
  type: typeof COMMAND_NAME.SHOW_REGION
  params: {}
}

export type SwitchStateCommand = {
  type: typeof COMMAND_NAME.SWITCH_STATE
  params: {}
}

export type SleepTimeoutCommand = {
  type: typeof COMMAND_NAME.SLEEP_TIMEOUT
  params: {}
}

export type TimeCommand = {
  type: typeof COMMAND_NAME.TIME
  params: {}
}

export type TransponderSelectCommand = {
  type: typeof COMMAND_NAME.TRANSPONDER_SELECT
  params: {}
}

export type VersionCommand = {
  type: typeof COMMAND_NAME.VERSION
  params: {}
}

export type WriteAutorunCommand = {
  type: typeof COMMAND_NAME.WRITE_AUTORUN
  params: {}
}

export type WriteTransponderCommand = {
  type: typeof COMMAND_NAME.WRITE_TRANSPONDER
  params: {}
}

export type WriteSingleTransponderCommand = {
  type: typeof COMMAND_NAME.WRITE_SINGLE_TRANSPONDER
  params: {}
}

export type Command =
  | AbortCommand
  | {
      type: typeof COMMAND_NAME.ALERT
      params: {}
    }
