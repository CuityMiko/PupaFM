export function assign (target, ...sources) {
  return Object.assign({}, target, ...sources)
}

export function isEmpty (obj) {
  return !Object.getOwnPropertyNames(obj).length
}
