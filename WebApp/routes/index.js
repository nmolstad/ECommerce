var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var router = express.Router();

router.get('/', function(req, res, next) {
  var xmlHttp = new XMLHttpRequest();
  // xmlHttp.withCredentials = true;

  xmlHttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      var items = null;
      if(this.status == 200) {
        items = JSON.parse(this.responseText);
      }
      res.render('index', { items: items });
    }
  };

  xmlHttp.open("GET", "http://item_service:8080/item", true);
  // xmlHttp.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
  xmlHttp.send();
});

router.get('/cart', function(req, res, next) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      var items = null;
      if(this.status == 200) {
        items = JSON.parse(this.responseText);
        items = {items: [{title: "yes", unitPrice: 23, quantity: 10, totalPrice: 230}],
                  total: 230};
      }
      res.render('cart', { cart: items });
    }
  };

  xmlHttp.open("GET", "http://localhost:8080/item", true);
  xmlHttp.send();
});

module.exports = router;
