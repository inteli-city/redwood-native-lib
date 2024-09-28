export const RESPONSE_FIELD_HEADER = {
  /** Autorun File Begin */
  AUTORUN_FILE_BEGIN: 'AB',

  /** Authentication Chip Test */
  AUTHENTICATION_CHIP_TEST: 'AC',

  /** Autorun File End */
  AUTORUN_FILE_END: 'AE',

  /** Antenna Serial Number */
  ANTENNA_SERIAL_NUMBER: 'AS',

  /** Bluetooth® Address */
  BLUETOOTH_ADDRESS: 'BA',

  /** Barcode Data */
  BARCODE_DATA: 'BC',

  /** Battery Health */
  BATTERY_HEALTH: 'BH',

  /** Battery Percentage Level */
  BATTERY_PERCENTAGE_LEVEL: 'BP',

  /** Barcode Raw */
  BARCODE_RAW: 'BR',

  /** Bluetooth® Version */
  BLUETOOTH_VERSION: 'BV',

  /** Channel Frequency */
  CHANNEL_FREQUENCY: 'CF',

  /** Charge Status */
  CHARGE_STATUS: 'CH',

  /** Transponder EPC CRC Value */
  TRANSPONDER_EPC_CRC_VALUE: 'CR',

  /** Command Started */
  COMMAND_STARTED: 'CS',

  /** Date */
  DATE: 'DA',

  /** Double Press User Defined Switch Action */
  DOUBLE_PRESS_USER_DEFINED_SWITCH_ACTION: 'DP',

  /** Date/Time Stamp */
  DATE_TIME_STAMP: 'DT',

  /** Transponder Access Error Code */
  TRANSPONDER_ACCESS_ERROR_CODE: 'EA',

  /** Transponder Backscatter Error Code */
  TRANSPONDER_BACKSCATTER_ERROR_CODE: 'EB',

  /** Transponder EPC Value */
  TRANSPONDER_EPC_VALUE: 'EP',

  /** Error */
  ERROR: 'ER',

  /** Bluetooth® Friendly Name */
  BLUETOOTH_FRIENDLY_NAME: 'FN',

  /** UHF API Version */
  UHF_API_VERSION: 'IA',

  /** Power Handle Bootloader Version Number */
  POWER_HANDLE_BOOTLOADER_VERSION_NUMBER: 'HB',

  /** Power Handle Firmware Version Number */
  POWER_HANDLE_FIRMWARE_VERSION_NUMBER: 'HF',

  /** Power Handle Serial Number */
  POWER_HANDLE_SERIAL_NUMBER: 'HS',

  /** Index Number */
  INDEX_NUMBER: 'IX',

  /** Kill Success */
  KILL_SUCCESS: 'KS',

  /** Log Begin */
  LOG_BEGIN: 'LB',

  /** Log End */
  LOG_END: 'LE',

  /** Log Length */
  LOG_LENGTH: 'LL',

  /** Licence Key */
  LICENCE_KEY: 'LK',

  /** Lock Success */
  LOCK_SUCCESS: 'LS',

  /** Message */
  MESSAGE: 'ME',

  /** Manufacturer Name */
  MANUFACTURER_NAME: 'MF',

  /** OK Response */
  OK_RESPONSE: 'OK',

  /** QT Control Word */
  QT_CONTROL_WORD: 'QT',

  /** Transponder EPC PC Value */
  TRANSPONDER_EPC_PC_VALUE: 'PC',

  /** Phase */
  PHASE: 'PH',

  /** Parameters */
  PARAMETERS: 'PR',

  /** Protocol Version Number */
  PROTOCOL_VERSION_NUMBER: 'PV',

  /** Radio Bootloader Version Number */
  RADIO_BOOTLOADER_VERSION_NUMBER: 'RB',

  /** Transponder Read Data */
  TRANSPONDER_READ_DATA: 'RD',

  /** Radio Firmware Version Number */
  RADIO_FIRMWARE_VERSION_NUMBER: 'RF',

  /** Transponder RSSI Value */
  TRANSPONDER_RSSI_VALUE: 'RI',

  /** Radio Serial Number */
  RADIO_SERIAL_NUMBER: 'RS',

  /** RSSI Percentage */
  RSSI_PERCENTAGE: 'RP',

  /** Single Press User Defined Switch Action */
  SINGLE_PRESS_USER_DEFINED_SWITCH_ACTION: 'SP',

  /** Set Region */
  SET_REGION: 'SR',

  /** Switch Status */
  SWITCH_STATUS: 'SW',

  /** Transponder TID Value */
  TRANSPONDER_TID_VALUE: 'TD',

  /** Time */
  TIME: 'TM',

  /** Unit Bootloader Version Number */
  UNIT_BOOTLOADER_VERSION_NUMBER: 'UB',

  /** Unit Firmware Version Number */
  UNIT_FIRMWARE_VERSION_NUMBER: 'UF',

  /** Unit Serial Number */
  UNIT_SERIAL_NUMBER: 'US',
} as const

export type ResponseFieldHeader =
  (typeof RESPONSE_FIELD_HEADER)[keyof typeof RESPONSE_FIELD_HEADER]
