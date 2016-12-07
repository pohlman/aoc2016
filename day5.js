const crypto = require('crypto');
const input = 'ffykfhsq';

// Part One
(function(){
  let password = '';
  for (let i = 0; password.length < 8; i++) {
    const hash = crypto.createHash('md5');
    hash.update(input + i);
    const hex = hash.digest('hex');
    if (hex.substring(0,5) === '00000') {
      password += hex[5]
    }
  }
  console.log(`Part One: ${password}`);
})();

// Part Two
(function(){
  const password = [null, null, null, null, null, null, null, null];

  for (let i = 0; password.some(c => c === null); i++) {
    const hash = crypto.createHash('md5');
    hash.update(input + i);
    const hex = hash.digest('hex');
    if (hex.substring(0,5) === '00000') {
      const pos = +hex[5];
      if (!isNaN(pos) && pos < 8) {
        password[pos] = password[pos] || hex[6];
      }
    }
  }
  console.log(`Part Two: ${password.join('')}`);
})();
