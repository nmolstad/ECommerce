function addItem() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://item-service:8080/item", true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({"title":title, "description":description, "unitPrice":price}));
}

function AddItemToCart(item) {

}