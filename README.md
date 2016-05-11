# m-parser - scrap any pages easy

## Super simple to use

Request is designed to be the simplest way possible to make page scrapping. It supports PhantomJS, request and just parse HTML tree.

```javascript
var parser = require('m-parser');
parser({
    url: 'http://google.com',
    encoding: 'utf-8', // 'utf-8' by default
    phantom: true // should use phantom scrapper
    data: {
        posts: '.posts', //simple usage
        post: {
            query: '.posts:first',
            attr: 'href', // if need to return an attribute value
            skip: 10, // 0 by default
            limit: 2,  // all by default
            first_only: true // to return object not array
        }
    },
}, function succ_cb (r){
    var data = r.data
    console.log('data - ', data);
    console.log('posts - ', data.posts);
    console.log('first post - ', data.post);
}, function error_cb (err){
    console.log('an error here')
})
```