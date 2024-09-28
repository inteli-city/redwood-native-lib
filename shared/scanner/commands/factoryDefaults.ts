import { FactoryDefaultsCommand, COMMAND_NAME } from '../constants/commands'
import { ScannerHelper } from '../helpers/Scanner'

type FactoryDefaultsCommandParams = {
  /** ePopLoq mode: Charge Only / Charge and Data @default 'cd' */
  ePopLoqMode?: FactoryDefaultsCommand['params']['ep']
  /** List the current parameter values */
  listParams?: FactoryDefaultsCommand['params']['p']
  /** Reset all command parameters to defaults */
  resetToDefault?: FactoryDefaultsCommand['params']['x']
}

/**
 * Restores all command parameters to their default settings.
 */
export function factoryDefaults(params: FactoryDefaultsCommandParams = {}) {
  const factoryDefaultsParams: FactoryDefaultsCommand['params'] = {
    ep: params.ePopLoqMode,
    p: ScannerHelper.booleanParameter(params.listParams),
    x: ScannerHelper.booleanParameter(params.resetToDefault),
  }

  return ScannerHelper.createASCIICommand(
    `${COMMAND_NAME.FACTORY_DEFAULTS} ${ScannerHelper.parseParamsToText(factoryDefaultsParams)}`
  )
}
