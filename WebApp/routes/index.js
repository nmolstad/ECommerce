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

  xmlHttp.open("GET", "http://item-service:8080/item", true);
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

  xmlHttp.open("GET", "http://cart-service:8080/cart/showCart/testingCart", true);
  xmlHttp.send();
});

router.get('/add-item', function(req, res, next) {
  res.render('additem');
});

router.post('/add-item', function(req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var price = req.body.price;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      res.redirect("/");
    }
  }

  xmlHttp.open("POST", "http://item-service:8080/item", true);
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify({"title":title, "description":description, "unitPrice":price}));


});

module.exports = router;
