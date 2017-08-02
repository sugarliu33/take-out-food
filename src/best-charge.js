'use strict';
var loadAllItems = require('./items.js');
var loadPromotions = require('./promotions.js');
var allItems = loadAllItems();
var promotionsInfo = loadPromotions();
function bestCharge(selectedItem) {
  var inputInfo = inputService(selectedItem);
  var buyItemsInfo = buildItemsInfo(inputInfo,allItems);
  var bestCharge = calculatePromotions(buyItemsInfo,promotionsInfo);
 // return /*TODO*/;
}
function inputService(tags) {
  let inputInfo = [];
  for (let item of tags) {
    if(item.includes('x')){
      let arrayItem = item.split('x');
      inputInfo.push({id:arrayItem[0].trim(),count:parseInt(arrayItem[1].trim())});
    }
  }
  return inputInfo;
}

function buildItemsInfo(inputInfo,allItems) {
  var buyItemsInfo = [];
  for (let obj of allItems) {
    for (let item of inputInfo) {
      if (item.id == obj.id){
        let totalPrice = (item.count * obj.price).toFixed(2);
        buyItemsInfo.push({ id: obj.id, count: item.count,name: obj.name, price: obj.price.toFixed(2), totalPrice: totalPrice })
      }
    }
  }
  return buyItemsInfo;
}
/**
function calculatePromotions( buyItemsInfo, promotionsInfo ) {
  var bestCharge = [];

  return bestCharge;
}
**/
function typeOneCharge( buyItemsInfo, type) {
  let typeOnePromotions = [];
  let summary = 0;

  for (let obj of buyItemsInfo) {
    summary += parseInt(obj.totalPrice);
  }
  if (summary >= 30){
    typeOnePromotions.push({type: type, charge: 6.00 })
  }
  console.log(typeOnePromotions);
  return typeOnePromotions;
}
module.exports = { buildItemsInfo: buildItemsInfo, inputService: inputService, typeOneCharge: typeOneCharge };




