'use strict';
var loadAllItems = require('./items.js');
var loadPromotions = require('./promotions.js');
var allItems = loadAllItems();
var promotionsInfo = loadPromotions();

function bestCharge(selectedItem) {
  var inputInfo = inputService(selectedItem);
  var buyItemsInfo = buildItemsInfo(inputInfo,allItems);
  var bestCharge = calculatePromotions(buyItemsInfo,promotionsInfo);
 // return /*TODO*/
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
        let totalPrice = item.count * obj.price;
        buyItemsInfo.push({ id: obj.id, count: item.count, name: obj.name, price: parseInt(obj.price), totalPrice: totalPrice })
      }
    }
  }
  return buyItemsInfo;
}

function calculatePromotions( buyItemsInfo, promotionsInfo ) {
  var bestCharge = [];
  var typeOnePromotions = typeOneCharge ( buyItemsInfo, promotionsInfo[0].type);
  var typeTwoPromotions = typeTwoCharge ( buyItemsInfo, promotionsInfo[1]);
  console.log(typeOnePromotions);
  if (typeOnePromotions[0].charge === 0 && typeTwoPromotions[0].charge === 0){
    return 0;
  }
  
}

function typeOneCharge( buyItemsInfo, type) {
  let typeOnePromotions = [];
  let summary = 0;
  let charge = 0;
  for (let obj of buyItemsInfo) {
    summary += parseInt(obj.totalPrice);
  }
  if (summary >= 30){
    charge = 6.00;
  }
  typeOnePromotions.push({type: type, charge: charge });
  return typeOnePromotions;
}

function typeTwoCharge(buyItemsInfo, promotionTwo) {
  let typeTwoPromotions = [];
  let promotionItem = promotionTwo.items;
  let itemName = [];
  let charge = 0;
  for (let obj of buyItemsInfo) {
    for (let item of promotionItem){
      if ( obj.id == item){
        itemName.push(obj.name);
        charge += obj.price / 2;
      }
    }
  }
  typeTwoPromotions.push({type:promotionTwo.type, name:itemName, charge: charge});
  return typeTwoPromotions;
}

module.exports = { buildItemsInfo: buildItemsInfo, inputService: inputService, typeOneCharge: typeOneCharge,
typeTwoCharge: typeTwoCharge, calculatePromotions: calculatePromotions};




