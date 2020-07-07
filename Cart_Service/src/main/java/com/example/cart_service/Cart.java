package com.example.cart_service;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


import java.util.HashMap;
import java.util.Map;

@RedisHash("cart")
public class Cart {
    private Map<Item, Integer> items;
    @Id
    private String username;

    public Cart(){

    }

    public Cart(HashMap<Item, Integer> items, String username){
        this.items = items;
        this.username = username;
    }

    public Cart(String username){
        this.username = username;
        this.items = new HashMap<>();
    }

    public Map<Item, Integer> getItems() {
        return items;
    }

    public void setItems(Map<Item, Integer> items) {
        this.items = items;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void addItem(Item item){
        items.put(item, 1);
    }

    public void removeItem(Item item){
        items.remove(item);
    }

    public void changeQuantity(Item item, int quantity){
        items.replace(item, quantity);
    }

    public void clearCart(){
        items = new HashMap<>();
    }
}
