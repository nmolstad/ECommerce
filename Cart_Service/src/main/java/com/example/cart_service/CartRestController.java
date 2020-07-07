package com.example.cart_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cart")
public class CartRestController {

    @Autowired
    CartRepository cartRepository;

    //USERNAME WILL BE REMOVED FROM ALL METHODS AFTER AUTHENTICATION IS IMPLEMENTED. WILL BE REPLACED WITH PRINCIPAL\


    //Currently this is just getting cart by username and returning it
    @RequestMapping(path = "/showCart/{username}", method = RequestMethod.GET)
    public Cart showCart(@PathVariable String username) {
        Cart cart = cartRepository.findById(username).orElse(null);
        if (cart != null) {
            return cart;
        }
        //Should probably error showing no cart was found but after Authentication I think this will solve itself
        return null;
    }

    //This should probably happen on login but for now it is an endpoint
    @RequestMapping(path = "/createCart/{username}", method = RequestMethod.POST)
    public void createCart(@PathVariable String username) {
        Cart cart = new Cart(username);
        cartRepository.save(cart);
    }

    //This clears entire thing not just a single cart. AKA hard reset
    @RequestMapping(path = "/deleteEverything", method = RequestMethod.DELETE)
    public void clearRedis() {
        cartRepository.deleteAll();
    }

    //This is the method to be called after user logs out or leaves.
    @RequestMapping(path = "/deleteCart/{username}", method = RequestMethod.DELETE)
    public void deleteCart(@PathVariable String username) {
        Cart cart = cartRepository.findById(username).orElse(null);
        if (cart != null) {
            cartRepository.delete(cart);
        }
    }

    @RequestMapping(path = "/changeQuantity/{itemId}/{quantity}/{username}", method = RequestMethod.PATCH)
    public void changeQuantity(@PathVariable String username, @PathVariable int itemId, @PathVariable int quantity) {
        Cart cart = cartRepository.findById(username).orElse(null);
        if (cart != null) {
            for (Map.Entry<Item, Integer> entry : cart.getItems().entrySet()) {
                if (entry.getKey().getId() == itemId) {
                    cart.changeQuantity(entry.getKey(), quantity);
                }
            }
            cartRepository.save(cart);
        }
    }

    @RequestMapping(path = "/clearCart/{username}", method = RequestMethod.GET)
    public void clearCart(@PathVariable String username) {
        Cart cart = cartRepository.findById(username).orElse(null);
        if (cart != null) {
            cart.clearCart();
            cartRepository.save(cart);
        }
    }


    @RequestMapping(path = "/removeItem/{itemId}/{username}", method = RequestMethod.DELETE)
    public void removeItem(@PathVariable String username, @PathVariable int itemId) {
        Cart cart = cartRepository.findById(username).orElse(null);
        if (cart != null) {
            for (Map.Entry<Item, Integer> entry : cart.getItems().entrySet()) {
                if (entry.getKey().getId() == itemId) {
                    cart.removeItem(entry.getKey());
                }
            }
            cartRepository.save(cart);
        }
    }

    @RequestMapping(path = "/addToCart/{username}", method = RequestMethod.POST)
    public void addItem(@PathVariable String username, @RequestBody Map<String, Object> body) {
        Item item = new Item();
        item.setId((int) body.get("id"));
        item.setTitle(body.get("title").toString());
        item.setDescription(body.get("description").toString());
        item.setUnitPrice((double) body.get("unitPrice"));
        Cart cart = cartRepository.findById(username).orElse(null);
        if (cart != null) {
            cart.addItem(item);
            cartRepository.save(cart);
        }
    }

    public double calculateCartTotal(Cart cart){
        double total = 0.0;
        for (Map.Entry<Item, Integer> entry : cart.getItems().entrySet()) {
            Item item = entry.getKey();
            int quantity = entry.getValue();
            double d = item.getUnitPrice() * quantity;
            total += d;
        }
        return total;
    }


}
