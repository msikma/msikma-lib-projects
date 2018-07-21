'use strict';

var _query = require('./query');

describe('objToParams', function () {
  it('should generate a valid query string from given parameters', function () {
    expect((0, _query.objToParams)({ a: 'b', b: 'c', c: 'd' })).toEqual('a=b&b=c&c=d');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2 })).toEqual('a=0&b=1&c=2');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2, d: null })).toEqual('a=0&b=1&c=2');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2, d: null }, { removeNull: false })).toEqual('a=0&b=1&c=2&d=null');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2, d: false })).toEqual('a=0&b=1&c=2&d=false');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2, d: false }, { removeFalse: false })).toEqual('a=0&b=1&c=2&d=false');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2, d: false }, { removeFalse: true })).toEqual('a=0&b=1&c=2');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2, d: '' })).toEqual('a=0&b=1&c=2');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2, d: '' }, { removeEmptyString: true })).toEqual('a=0&b=1&c=2');
    expect((0, _query.objToParams)({ a: 0, b: 1, c: 2, d: '' }, { removeEmptyString: false })).toEqual('a=0&b=1&c=2&d=');
    expect((0, _query.objToParams)({ a: [] })).toEqual('');
    expect((0, _query.objToParams)({ a: ['a'], b: 'c' })).toEqual('a[]=a&b=c');
    expect((0, _query.objToParams)({ a: [], b: 'c' })).toEqual('b=c');
    expect((0, _query.objToParams)({ a: [], b: 'c' }, { removeEmptyArray: false })).toEqual('a[]=&b=c');
    expect((0, _query.objToParams)({ a: ['a', 'b', 'c'] })).toEqual('a[]=a&a[]=b&a[]=c');
  });
}); /**
     * buyee-js - Buyee Client Library <https://github.com/msikma/buyee-js>
     * Copyright © 2018, Michiel Sikma. MIT license.
     */

describe('toFormURIComponent', function () {
  it('should convert URI-encoded spaces to + symbols', function () {
    expect((0, _query.toFormURIComponent)(encodeURIComponent('foo bar baz'))).toEqual('foo+bar+baz');
    expect((0, _query.toFormURIComponent)(encodeURIComponent('foo+bar+baz'))).toEqual('foo%2Bbar%2Bbaz');
    expect((0, _query.toFormURIComponent)(encodeURIComponent('foo bar%20baz'))).toEqual('foo+bar%2520baz');
    expect((0, _query.toFormURIComponent)('foo%20bar%20baz')).toEqual('foo+bar+baz');
  });
});