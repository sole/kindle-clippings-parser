# kindle-clippings-parser

> A module to parse the clippings from a Kindle device.

This module *only* parses clippings. There's no pretty formatting or anything like that here.

If you want fancy formatting, you should try [kindle-my-clippings](https://www.npmjs.com/package/kindle-my-clippings), which does a lot more stuff and also offers a CLI, etc.

Shared for educational purposes. No support provided.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

## Installing

```bash
npm install @sole/kindle-clippings-parser
```

## Using

```javascript
var fs = require('fs');
var parse = require('@sole/kindle-clippings-parser').parse;

var fileContents = fs.readFileSync('clippings.txt', 'utf-8');
var parsed = parse(fileContents);

// You can do whatever you want with the data,
// but this is how you would iterate over it:
parsed.forEach(function(item) {
	// Each item is an object
	// { title, highlights }
	// item.highlights is an array of objects
	// item.highlights = [ { text, metadata }, { text, metadata }, ... ];
});
```

There's a working example in `test/test.js` that displays a bulleted list of highlights per title, using a sample `test-clippings.txt` file (also in the same `test` folder).

## Limitations

This module assumes that everything is a highlight and ignores the fact that bookmarks are also saved in the clippings file. Bookmarks are interpreted as highlight, which does not make quite a lot of sense, but doesn't bother me right now.

Also metadata is not parsed either because I'm not interested in the location of the highlight or the time I created it.

There are also no proper tests. It might be the case that it doesn't work with certain types of clippings. The functions used for parsing are exposed in the module so they can be eventually be unit tested in the future. As a hobby project, it is highly unlikely this will happen though.

## Where do you find the clippings file?

Assuming all Kindles work the same, connect it to your computer using a USB data cable (not all USB cables work for data... some are barely good for charging and that's it), and after a bit the device should appear in your file explorer (e.g. the Finder).

Open the device and navigate to the root and you'll find a file called `My clippings.txt`. Copy it to your computer and have fun!
