# cssify #

Simple middleware and method for Browserify to add css styles to the browser.

# Example

If you have a file `entry.js` that you want to require some css from `style.css`:

style.css:
``` css
body {
  background: pink;
}
```

entry.js:
``` js
require('./style.css');

console.log('The background is pink!')
```

Install cssify into your app:

```
$ npm install cssify
```

When you compile your app, just pass `-t cssify` to browserify:

```
$ browserify -t cssify entry.js > bundle.js
```


# Install

With [npm](https://npmjs.org):

```
npm install cssify
```

# License

MIT