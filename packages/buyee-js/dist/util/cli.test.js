'use strict';

var _cli = require('./cli');

describe('cliToAPIArgs', function () {
  it('should convert the input object format to a format usable by the YahooAuction object', function () {
    // Data as given to us by the CLI.
    var cliArgsOne = {
      action: 'search',
      output: 'json',
      query: 'one piece',
      category: '20060',
      seller: 'resyk19',
      price_min: '800',
      price_max: '1500',
      buyout_min: '340',
      buyout_max: '500000',
      item_status: 'any',
      store_type: 'any',
      withBuyout: true,
      newlyListed: true,
      freeDeliveryInJapan: true,
      withPictures: false,
      buyeeRecommended: false
    };
    var cliArgsTwo = {
      action: 'search',
      output: 'json',
      query: 'pokemon',
      category: null,
      seller: 'resyk19',
      price_min: null,
      price_max: '1500',
      buyout_min: '340',
      buyout_max: null,
      item_status: 'used',
      store_type: 'individualSeller',
      withBuyout: false,
      newlyListed: false,
      freeDeliveryInJapan: false,
      withPictures: false,
      buyeeRecommended: false
      // Data as the API wants it.
    };var apiArgsOne = {
      currentPriceRange: { min: 800, max: 1500 },
      buyoutPriceRange: { min: 340, max: 500000 },
      itemStatus: 'any',
      storeType: 'any',
      options: {
        withBuyout: true,
        newlyListed: true,
        freeDeliveryInJapan: true,
        withPictures: false,
        buyeeRecommended: false
      },
      query: 'one piece',
      category: '20060',
      seller: 'resyk19'
    };
    var apiArgsTwo = {
      currentPriceRange: { min: null, max: 1500 },
      buyoutPriceRange: { min: 340, max: null },
      itemStatus: 'used',
      storeType: 'individualSeller',
      options: {
        withBuyout: false,
        newlyListed: false,
        freeDeliveryInJapan: false,
        withPictures: false,
        buyeeRecommended: false
      },
      query: 'pokemon',
      seller: 'resyk19'
    };

    expect((0, _cli.cliToAPIArgs)(cliArgsOne)).toEqual(apiArgsOne);
    expect((0, _cli.cliToAPIArgs)(cliArgsTwo)).toEqual(apiArgsTwo);
  });
}); /**
     * buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
     * Copyright © 2018, Michiel Sikma. MIT license.
     */

describe('outputData', function () {
  // Redirect the output of console.log() to a variable.
  var consoleOutput = '';
  var logToVariable = function logToVariable(str) {
    return consoleOutput = str;
  };

  it('should wrap output data in \'result\' and output it as JSON using console.log()', function () {
    // Use our console.log() mock.
    console.log = jest.fn(logToVariable);
    (0, _cli.outputData)({ a: 'b', c: 'd' });
    expect(consoleOutput).toBe('{"result":{"a":"b","c":"d"}}');
    (0, _cli.outputData)({ a: 'b', c: 'd' });
    expect(consoleOutput).toBe('{"result":{"a":"b","c":"d"}}');
    (0, _cli.outputData)({});
    expect(consoleOutput).toBe('{"result":{}}');
  });
});
