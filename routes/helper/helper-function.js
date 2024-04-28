const sum = (obj) => {
  let total = 0
  obj.forEach(item => total += item.cost * item.quantity)
  return total
}

module.exports = {sum}
