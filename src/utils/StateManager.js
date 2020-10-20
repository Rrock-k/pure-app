const { useState, useMemo } = require('react')

export default class StateManager {
  constructor() {
    this.state = {}
    this.vars = {}
  }

  addState(name, initialValue, { hasSubstate } = {}) {
    const [stateValue, setStateFunction] = useState(initialValue)
    this.state[name] = stateValue
    this.state['set' + name[0].toUpperCase() + name.slice(1)] = setStateFunction
    if (!hasSubstate) return [stateValue, setStateFunction]

    const propSetterFunc = (propName, newValue) =>
      setStateFunction(prev => ({ ...prev, [propName]: newValue }))

    this.state['set' + name[0].toUpperCase() + name.slice(1) + 'Prop'] = propSetterFunc
    return [stateValue, setStateFunction, propSetterFunc]
  }

  setState(objWithNewStateValues) {
    for (const key in objWithNewStateValues) {
      const newValue = objWithNewStateValues[key]
      const setterName = 'set' + key[0].toUpperCase() + key.slice(1)
      console.log(setterName)
      const setProp = this.state[setterName]
      if (setProp) setProp(objWithNewStateValues[key])
    }
  }

  getAddState() {
    return this.addState.bind(this)
  }

  getSetState() {
    return this.setState.bind(this)
  }

  getState() {
    return this.state
  }

  getVars() {
    return this.vars
  }

  static stateMemo() {
    return useMemo(() => {
      const manager = new StateManager()
      return {
        stateManager: manager,
        state: manager.getState(),
        addState: manager.getAddState(),
        setState: manager.getSetState(),
        vars: manager.getVars(),
      }
    }, [])
  }
}
