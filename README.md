# m-parser - scrap any pages easy

## Super simple to use

Request is designed to be the simplest way possible to make page scrapping. It supports PhantomJS, request and just parse HTML tree.

```javascript
var parser = require('m-parser');
parser({
    url: 'http://google.com',
    structure: {
        posts: '.posts'
        first_post: '.posts:first'
    }
    isPhantom: true // or false
})
```