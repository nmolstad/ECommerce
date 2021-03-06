function addItem() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://item-service:8080/item", true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({"title":title, "description":description, "unitPrice":price}));
}

function AddItemToCart(id, title, unitPrice, description, username) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", `http://cart-service:8080/cart/addToCart/${username}`, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({"id":id, "title":title, "description":description, "unitPrice":unitPrice}));

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        console.log(this.readyState)
        console.log(this.status)
    }
    xmlHttp.open("POST", `http://cart-service:8080/cart/createCart/tester`, true);
    xmlHttp.send();
}