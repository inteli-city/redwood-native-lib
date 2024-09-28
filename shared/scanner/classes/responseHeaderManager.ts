import { ResponseFieldHeader } from '../constants/responseHeader'

class ResponseHeaderManager {
  private readonly responseFieldHeaderHandlers: Map<
    ResponseFieldHeader,
    ((value: string) => void)[]
  > = new Map()

  private separateKeyFromValue(eventMessage: string) {
    return eventMessage.split(': ') as [ResponseFieldHeader, string]
  }

  public registerHandler(
    event: ResponseFieldHeader,
    handler: (value: string) => void
  ) {
    const hasHandlers = this.responseFieldHeaderHandlers.has(event)

    if (!hasHandlers) {
      this.responseFieldHeaderHandlers.set(event, [])
    }

    this.responseFieldHeaderHandlers.get(event)?.push(handler)
  }

  public getHandlers(event: ResponseFieldHeader) {
    const hasRegisteredEvents = this.responseFieldHeaderHandlers.has(event)

    if (!hasRegisteredEvents) {
      return []
    }

    return this.responseFieldHeaderHandlers.get(event)
  }

  public sendEvent(eventMessage: string) {
    if (eventMessage === '\r') return
    const [event, data] = this.separateKeyFromValue(eventMessage)

    this.getHandlers(event).forEach((handler) => handler(data))
  }
}

export const ResponseHeaderManagerInstance = new ResponseHeaderManager()
