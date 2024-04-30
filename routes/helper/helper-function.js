const sum = (obj) => {
  let total = 0
  obj.forEach(item => total += item.cost * item.quantity)
  return total
}
// const updateQuantity = (obj, id, menu_item_id) => {
//   obj.forEach(item => {
//     if (item.cart_id === id && item.item_id === menu_item_id)
//     {return item.quantity}
//   })
// }
const randomCodeGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

function mergeQuantity(arr) {
  const resultMap = new Map();

  // Iterate over the input array
  arr.forEach(obj => {
      // Check if the name exists in the resultMap
      if (resultMap.has(obj.name)) {
          // If it exists, increase the quantity
          const existingObj = resultMap.get(obj.name);
          existingObj.quantity += obj.quantity;
      } else {
          // If it doesn't exist, add it to the resultMap
          resultMap.set(obj.name, { ...obj });
      }
  });

  // Convert the Map values to an array and return
  return Array.from(resultMap.values());
}
module.exports = {sum, randomCodeGenerator, mergeQuantity}
