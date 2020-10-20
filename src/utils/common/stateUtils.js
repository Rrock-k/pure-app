export function getPropertySetterFor(setStateFunc) {
  return function (propertyName, newValue) {
    setStateFunc(oldState => ({ ...oldState, [propertyName]: newValue }))
  }
}

export function deleteProperty(setStateFunc, propertyName) {
  setStateFunc(oldState => {
    let newState = { ...oldState }
    delete newState[propertyName]
    return newState
  })
}
