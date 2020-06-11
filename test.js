const assert = require("assert").strict;
const redirects = require("./redirects.json");

const fromSlugs = [];
const newsSubPathRE = /^\/news\//;

redirects.forEach((obj, i) => {
  const from = obj.from;
  const to = obj.to;
  const externalUrl = to.startsWith("https://");

  // Skip the first five redirect objects
  if (i > 4) {
    // 'from' is not '/' or '/ghost'
    assert.notStrictEqual(from, "/");
    assert.notStrictEqual(from, "/ghost");

    if (!externalUrl) {
      // First characters are '/'
      assert.deepStrictEqual(from[0], "/");
      assert.deepStrictEqual(to[0], "/");
    }

    // Last characters are not '/'
    assert.notStrictEqual(from[from.length - 1], "/");
    // 'to' is not News front page
    if (to.length > 1) {
      assert.notStrictEqual(to[to.length - 1], "/");
    }

    // the slugs should not include `/news` in the paths
    if (newsSubPathRE.test(from) || newsSubPathRE.test(to)) {
      throw "Found non-complaint slug in from:" + from + " or/and to: " + to;
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
