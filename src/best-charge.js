'use strict';

function bestCharge(selectedItem) {
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

module.exports = inputService;




