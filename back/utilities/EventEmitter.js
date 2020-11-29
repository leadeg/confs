class EventEmitter {
  constructor() {
    this.events = {}
  }

  getEventListByName(eventName) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set()
    }
    return this.events[eventName]
  }

  on(eventName, fn) {
    this.getEventListByName(eventName).add(fn)
  }

  once(eventName, fn) {
    const self = this

    const onceFn = (...args) => {
      self.removeListener(eventName, onceFn)
      fn.apply(self, args)
    }
    this.on(eventName, onceFn)
  }

  emit(eventName, ...args) {
    this.getEventListByName(eventName).forEach((fn) => {
      fn.apply(this, args)
    })
  }

  removeListener(eventName, fn) {
    this.getEventListByName(eventName).delete(fn)
  }
}

export default EventEmitter
