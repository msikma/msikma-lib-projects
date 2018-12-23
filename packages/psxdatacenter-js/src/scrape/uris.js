// psxdatacenter-js - Playstation DataCenter Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

export const baseURL = 'https://psxdatacenter.com/'

const overviewPages = {
  ps1: ['jlist', 'ulist', 'plist'],
  ps2: ['jlist2', 'ulist2', 'plist2'],
  psp: ['psp/jlist', 'psp/ulist', 'psp/plist']
}

const detailPages = {
  ps2: 'psx2/games2/',
  psp: 'psp/games/'
}

export const overviewURL = (cns) => {
  return overviewPages[cns].map(u => `${baseURL}${u}.html`)
}

export const discURL = (id) => {
  const sanitizedID = sanitizeID(id)
  const cns = getConsoleFromID(sanitizedID)
  if (cns === 'ps1') {
    // not implemented
    return ''
  }
  return `${baseURL}${detailPages[cns]}${sanitizedID}.html`

}

const getConsoleFromID = () => {
  return 'ps1'
}

const sanitizeID = () => {
  return ''
}
