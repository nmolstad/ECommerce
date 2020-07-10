var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var router = express.Router();

router.get('/', function(req, res, next) {
  setUUID(req)

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      var items = null;
      if(this.status == 200) {
        items = JSON.parse(this.responseText);
      }
      res.render('index', { items: items, username: req.session.username });
    }
  };

  xmlHttp.open("GET", "http://item-service:8080/item", true);
  xmlHttp.send();
});

router.get('/cart', function(req, res, next) {
  setUUID(req)

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      var cart = null;
      if(this.status == 200) {
        cart = JSON.parse(this.responseText);
      }
      res.render('cart', { cart: cart, username: req.session.username });
    }
  };

  xmlHttp.open("GET", `http://cart-service:8080/cart/showCart/${req.session.username}`, true);
  xmlHttp.send();
});

router.get('/add-item', function(req, res, next) {
  setUUID(req)

  res.render('additem', {username: req.session.username});
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

router.post('/add-item-to-cart/:id/:title/:description/:price', function(req, res, next) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", `http://cart-service:8080/cart/addToCart/${req.session.username}`, true);
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify({"id":parseInt(req.params.id), "title":req.params.title, "description":req.params.description, "unitPrice":req.params.price, "quantity": 1}));

  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      res.redirect("/");
    }
  }
});

router.post('/delete-item/:id', function(req, res, next) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("DELETE", `http://item-service:8080/item/${req.params.id}`, true);
  xmlHttp.send();

  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      res.redirect("/");
    }
  }
});

router.get('/edit-item/:id', function(req, res, next) {
  setUUID(req)

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      var item = null;
      if(this.status == 200) {
        item = JSON.parse(this.responseText);
      }
      res.render('editItem', { item: item, username: req.session.username });
    }
  };

  xmlHttp.open("GET", `http://item-service:8080/item/${req.params.id}`, true);
  xmlHttp.send();
});

router.post('/edit-item/:id', function(req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var price = req.body.price;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      res.redirect("/");
    }
  }

  xmlHttp.open("PATCH", `http://item-service:8080/item/${req.params.id}`, true);
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify({"title":title, "description":description, "unitPrice":price}));
});

router.post('/cart/change-quantity/:id', function(req, res, next) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("PATCH", `http://cart-service:8080/cart/changeQuantity/${req.params.id}/${req.body.quantity}/${req.session.username}`, true);
  xmlHttp.send();

  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      res.redirect("/cart");
    }
  }
});

router.post('/cart/remove-item/:id', function(req, res, next) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("DELETE", `http://cart-service:8080/cart/removeItem/${req.params.id}/${req.session.username}`, true);
  xmlHttp.send();

  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      res.redirect("/cart");
    }
  }
});

router.get('/cart/checkout', function(req, res, next) {
  res.render('checkout');
});

router.post('/cart/checkout', function(req, res, next) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", `http://checkout-service:8080/checkout/${req.session.username}`, true);
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify({"cardNumber":req.body.cc, "email":req.body.email}));

  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      res.redirect("/");
    }
  }
});


function setUUID(req) {
  if(req.session.username == null) {
    req.session.username = uuidv4();

    console.log(req.session.username);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", `http://cart-service:8080/cart/createCart/${req.session.username}`, true);
    xmlHttp.send();
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });}

module.exports = router;
