export class ScannerHelper {
  static parseParamsToText = (params: Record<string, unknown>) => {
    return Object.keys(params).reduce((acc, currentValue) => {
      const value = params[currentValue]

      if (value !== undefined) {
        return `${acc} -${currentValue} ${value}`
      }

      return acc
    }, '')
  }

  static createASCIICommand(string: string) {
    return `${string}\n`
  }
}
