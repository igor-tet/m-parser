# m-parser - scrap any pages easy

## Super simple to use

Request is designed to be the simplest way possible to make page scrapping. It supports PhantomJS, request and just parse HTML tree.

```javascript
var parser = require('m-parser');
parser({
    url: 'http://google.com',
    data: {
        posts: '.posts'
        post: '.posts:first'
    }
    isPhantom: true // or false
}, function succ_cb (r){
    var data = r.data
    console.log('data - ', data);
    console.log('posts - ', data.posts);
    console.log('first post - ', data.post);
}, function error_cb (err){
    console.log('an error here')
})
```