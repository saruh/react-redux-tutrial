var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET comments listing. */
router.get('/', function(req, res, next) {
  fs.readFile('db/comments.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

/* POST comment creating. */
router.post('/', function(req, res) {
  fs.readFile('db/comments.json', function(err, data) {
    var comments = JSON.parse(data);

    // fixed bug
    if (!req.body.id) {
      var maxId = 0;
      comments.map(function(c){
        if (c.id && parseInt(c.id)>maxId){
          maxId=parseInt(c.id);
        }
      });
      req.body.id = String(maxId + 1);
    }

    comments.push(req.body);
    fs.writeFile('db/comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

module.exports = router;