'use strict';
var loadAllItems = require('./items.js');
var loadPromotions = require('./promotions.js');
var allItems = loadAllItems();
var promotionsInfo = loadPromotions();
/**
function bestPromotions(selectedItem) {
  var inputInfo = inputService(selectedItem);
  var buyItemsInfo = buildItemsInfo(inputInfo,allItems);
  var bestCharge = calculatePromotions(buyItemsInfo,promotionsInfo);
  var printItemsList = buildItemsInfo(buyItemsInfo,bestCharge);
  return printItemsList;
}
**/
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
      if (item.id === obj.id){
        let totalPrice = item.count * obj.price;
        buyItemsInfo.push({ id: obj.id, count: item.count, name: obj.name, price: parseInt(obj.price), totalPrice: totalPrice })
      }
    }
  }
  return buyItemsInfo;
}

function calculatePromotions( buyItemsInfo, promotionsInfo ) {
  var typeOnePromotions = typeOneCharge ( buyItemsInfo, promotionsInfo[0].type);
  var typeTwoPromotions = typeTwoCharge ( buyItemsInfo, promotionsInfo[1]);
  if (typeOnePromotions[0].charge === 0 && typeTwoPromotions[0].charge === 0){
    return 0;
  }else if (typeOnePromotions[0].charge > typeTwoPromotions[0].charge){
    return typeOnePromotions;
  }else {
    return typeTwoPromotions;
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

function buildPrintList(bestCharge, buyItemsInfo) {
  var printItemsList = '';
  var summary = 0;
  for (let obj of buyItemsInfo) {
    summary += obj.totalPrice;
  }
  printItemsList += '============= 订餐明细 =============' + '\n';
  for (let obj of buyItemsInfo) {
    printItemsList += obj.name + " x "+ obj.count + " = "+ obj.totalPrice + "元" + '\n';
  }
  printItemsList += '-----------------------------------' + '\n' + '使用优惠:' + '\n';
  if (bestCharge[0].type === '指定菜品半价'){
    printItemsList += '指定菜品半价(' + bestCharge[0].name +')，'+ '省' + bestCharge[0].charge + '元'+'\n';
  }
  printItemsList += '-----------------------------------' + '\n';
  printItemsList += '总计：' + (summary - bestCharge[0].charge) + '元' + '\n';
  printItemsList += '===================================' + '\n';
  return printItemsList;
}
module.exports = { buildItemsInfo: buildItemsInfo, inputService: inputService, typeOneCharge: typeOneCharge,
typeTwoCharge: typeTwoCharge, calculatePromotions: calculatePromotions, buildPrintList: buildPrintList};




