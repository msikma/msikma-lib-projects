// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

export const toJSON = obj => {
  return JSON.stringify(obj)
}

export const toXML = obj => {
  return '<xml>not implemented yet</xml>'
}

const dataTypes = {
  json: toJSON,
  xml: toXML
}

const toDataString = (obj, type) => {
  if (type === 'terminal') {
    // The terminal type needs no formatting.
    // Logging a plain object in Node makes it easily readable in a terminal.
    return obj
  }
  try {
    return dataTypes[type.toLowerCase()](obj)
  }
  catch (err) {
    throw new Error(`outData: invalid data type: ${type}`)
  }
}

export default toDataString
