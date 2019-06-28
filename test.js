const assert = require('assert').strict;
const fs = require('fs');
const redirects = JSON.parse(fs.readFileSync('./redirects.json', 'utf8'));
const fromSlugs = [];

redirects.forEach(obj => {
  const from = obj.from;
  
  assert.notStrictEqual(from, '/');
  assert.notStrictEqual(from, '/ghost');
  
  fromSlugs.push(from);
});

const duplicates = fromSlugs.reduce((acc, curr, i, arr) => {
  if (arr.indexOf(curr) !== i && acc.indexOf(curr) < 0) {
    acc.push(curr);
  }

  return acc;
}, []);

assert.deepStrictEqual(duplicates.length, 0);
