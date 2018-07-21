/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import { objToParams, toFormURIComponent } from './query'

describe('objToParams', () => {
  it('should generate a valid query string from given parameters', () => {
    expect(objToParams({ a: 'b', b: 'c', c: 'd' })).toEqual('a=b&b=c&c=d')
    expect(objToParams({ a: 0, b: 1, c: 2 })).toEqual('a=0&b=1&c=2')
    expect(objToParams({ a: 0, b: 1, c: 2, d: null })).toEqual('a=0&b=1&c=2')
    expect(objToParams({ a: 0, b: 1, c: 2, d: null }, { removeNull: false })).toEqual('a=0&b=1&c=2&d=null')
    expect(objToParams({ a: 0, b: 1, c: 2, d: false })).toEqual('a=0&b=1&c=2&d=false')
    expect(objToParams({ a: 0, b: 1, c: 2, d: false }, { removeFalse: false })).toEqual('a=0&b=1&c=2&d=false')
    expect(objToParams({ a: 0, b: 1, c: 2, d: false }, { removeFalse: true })).toEqual('a=0&b=1&c=2')
    expect(objToParams({ a: 0, b: 1, c: 2, d: '' })).toEqual('a=0&b=1&c=2')
    expect(objToParams({ a: 0, b: 1, c: 2, d: '' }, { removeEmptyString: true })).toEqual('a=0&b=1&c=2')
    expect(objToParams({ a: 0, b: 1, c: 2, d: '' }, { removeEmptyString: false })).toEqual('a=0&b=1&c=2&d=')
    expect(objToParams({ a: [] })).toEqual('')
    expect(objToParams({ a: ['a'], b: 'c' })).toEqual('a[]=a&b=c')
    expect(objToParams({ a: [], b: 'c' })).toEqual('b=c')
    expect(objToParams({ a: [], b: 'c' }, { removeEmptyArray: false })).toEqual('a[]=&b=c')
    expect(objToParams({ a: ['a', 'b', 'c'] })).toEqual('a[]=a&a[]=b&a[]=c')
  })
})

describe('toFormURIComponent', () => {
  it('should convert URI-encoded spaces to + symbols', () => {
    expect(toFormURIComponent(encodeURIComponent('foo bar baz'))).toEqual('foo+bar+baz')
    expect(toFormURIComponent(encodeURIComponent('foo+bar+baz'))).toEqual('foo%2Bbar%2Bbaz')
    expect(toFormURIComponent(encodeURIComponent('foo bar%20baz'))).toEqual('foo+bar%2520baz')
    expect(toFormURIComponent('foo%20bar%20baz')).toEqual('foo+bar+baz')
  })
})
