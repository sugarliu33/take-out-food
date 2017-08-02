'use strict';
var loadAllItems = require('./items.js');
var allItems = loadAllItems();
function bestCharge(selectedItem) {
  var inputInfo = inputService(selectedItem);
  var buyItemsInfo = buildItemsInfo(inputInfo,allItems);
 // return /*TODO*/;
}
function inputService(tags) {
  console.log(tags);
  let inputInfo = [];
  for (let item of tags) {
    if(item.includes('x')){
      let arrayItem = item.split('x');
      inputInfo.push({id:arrayItem[0].trim(),count:parseInt(arrayItem[1].trim())});
    }
  }
  console.log(inputInfo);
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

module.exports = {buildItemsInfo: buildItemsInfo,inputService:inputService};




