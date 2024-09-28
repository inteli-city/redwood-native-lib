export class ScannerHelper {
  static parseParamsToText = (params: Record<string, unknown>) => {
    return Object.keys(params).reduce((acc, currentParam) => {
      const value = params[currentParam]

      if (value !== undefined) {
        if (value === true) {
          return `${acc} -${currentParam}`
        }

        return `${acc} -${currentParam} ${value}`
      }

      return acc
    }, '')
  }

  static createASCIICommand(string?: string) {
    return `${string}\n`
  }

  static booleanParameter(value?: boolean) {
    if (!value) return undefined
    return value
  }
  static quotedParameter(value?: string) {
    if (!value) return undefined
    return `"${value}"`
  }

  static rangeParameter(value: number | undefined, min: number, max: number) {
    if (!value) return undefined
    return Math.max(min, Math.min(max, value))
  }
}
