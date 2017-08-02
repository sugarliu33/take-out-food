'use strict';

var bestCharge = require('../src/best-charge.js');

var loadAllItems = require('../src/items.js');

xdescribe('Take out food', function () {


  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()//String.trim():去掉字符串首尾的空格或预定义字符。
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});

xdescribe ('Test inputService',function () {

  it('should generate inputObject when do input ',function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let inputsInfo = bestCharge.inputService(inputs);
    let expected = [ { id: 'ITEM0013', count: 4 }, { id: 'ITEM0022', count: 1 } ];
    expect(inputsInfo).toEqual(expected);
  });
});

describe ('Test buildItemsInfo',function () {
  it ('should generate buyItemsInfo via buildItemsInfo()',function () {
    let inputInfo = [ { id: 'ITEM0013', count: 4 }, { id: 'ITEM0022', count: 1 } ];
    let allItems = loadAllItems();
    let buyItemsInfo = bestCharge.buildItemsInfo(inputInfo,allItems);
    expect(buyItemsInfo).toEqual([ { id: 'ITEM0013', count: 4, name: '肉夹馍', price: 6.00, totalPrice: 24.00 },
      { id: 'ITEM0022', count: 1, name: '凉皮', price: 8.00, totalPrice: 8.00} ]);
  });
});

