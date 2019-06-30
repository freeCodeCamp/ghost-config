const assert = require('assert').strict;
const fs = require('fs');
const redirects = JSON.parse(fs.readFileSync('./redirects.json', 'utf8'));
const fromSlugs = [];

redirects.forEach((obj, i) => {
  // Skip the first three redirect objects
  if (i > 2) {
    const from = obj.from;
    const to = obj.to;
    
    // 'from' is not '/' or '/ghost'
    assert.notStrictEqual(from, '/');
    assert.notStrictEqual(from, '/ghost');

    // First characters are '/'
    assert.deepStrictEqual(from[0], '/');
    assert.deepStrictEqual(to[0], '/');

    // Last characters are not '/'
    assert.notStrictEqual(from[from.length - 1], '/');
    assert.notStrictEqual(to[to.length - 1], '/');

    fromSlugs.push(from);
  }
});

const duplicates = fromSlugs.reduce((acc, curr, i, arr) => {
  if (arr.indexOf(curr) !== i && acc.indexOf(curr) < 0) {
    acc.push(curr);
  }

  return acc;
}, []);

assert.deepStrictEqual(duplicates.length, 0);
