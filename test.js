const assert = require('assert').strict;
const fs = require('fs');
const redirects = JSON.parse(fs.readFileSync('./redirects.json', 'utf8'));
const fromSlugs = [];

redirects.forEach((obj, i) => {
  const from = obj.from;
  const to = obj.to;
  const mediumRedirect = to.includes('https://medium.com/');

  // Skip the first three redirect objects
  // and DMCA redirects to Medium
  if (i > 2) {
    
    // 'from' is not '/' or '/ghost'
    assert.notStrictEqual(from, '/');
    assert.notStrictEqual(from, '/ghost');

    if (!mediumRedirect) {
      // First characters are '/'
      assert.deepStrictEqual(from[0], '/');
      assert.deepStrictEqual(to[0], '/');

      // Last characters are not '/'
      assert.notStrictEqual(from[from.length - 1], '/');
      assert.notStrictEqual(to[to.length - 1], '/');
    }

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
