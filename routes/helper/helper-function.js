const sum = (obj) => {
  let total = 0
  obj.forEach(item => total += item.cost * item.quantity)
  return total
}
const randomCodeGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}
module.exports = {sum, randomCodeGenerator}
