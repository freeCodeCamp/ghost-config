const assert = require('assert').strict;
const fs = require('fs');

const redirects = JSON.parse(fs.readFileSync('./redirects.json', 'utf8'));

redirects.forEach(obj => {
  const from = obj.from;
  
  assert.notStrictEqual(from, '/');
  assert.notStrictEqual(from, '/ghost');
});
