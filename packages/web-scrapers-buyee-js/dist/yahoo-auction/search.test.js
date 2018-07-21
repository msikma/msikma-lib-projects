'use strict';

var _search = require('./search');

describe('makeSearchURL', function () {
  it('should generate valid search URLs', function () {
    expect((0, _search.makeSearchURL)({ query: 'test' })).toEqual('https://buyee.jp/item/search/query/test');
    expect((0, _search.makeSearchURL)({
      query: { terms: 'プライズ', phrase: 'ワンピース', 'excluded': 'フィギュア' }
    })).toEqual('https://buyee.jp/item/search/query/' + encodeURIComponent('プライズ(ワンピース)-フィギュア'));
    // TODO: more
  });
});
/*

const {
  // Search query ({ terms: '', phrase: '', excluded: '' })
  query,
  // Category ID (a number or a string containing a number)
  category,
  // Seller username (a string)
  seller,
  // Current price range (min, max)
  currentPriceRange,
  // Buyout price range (min, max)
  buyoutPriceRange,
  // Item status (new items only, used items only, or any)
  itemStatus,
  // Store type (commercial store, individual seller, or any)
  storeType,
  // Additional options: newly posted, free delivery within Japan, with buyout price, with picture, Buyee recommended
  options
} = merge(defaults, search)
*/
/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */