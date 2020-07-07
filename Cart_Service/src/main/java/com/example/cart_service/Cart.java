package com.example.cart_service;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RedisHash("cart")
public class Cart {
    private List<Item> items;
    @Id
    private String username;
    private double total;

    public Cart() {

    }

    public Cart(List<Item> items, String username) {
        this.items = items;
        this.username = username;
        calculateCartTotal();
    }

    public Cart(String username) {
        this.username = username;
        this.items = new ArrayList<>();
        setTotal(0.0);
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
        calculateCartTotal();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void addItem(Item item) {
        getItems().add(item);
        calculateCartTotal();
    }

    public void removeItem(Item item) {
        items.remove(item);
        calculateCartTotal();
    }

    public void changeQuantity(Item item, int quantity) {
        for (Item i : getItems()) {
            if (i.getId() == item.getId()) {
                i.setQuantity(quantity);
            }
        }
        calculateCartTotal();
    }

    public void clearCart() {
        items = new ArrayList<>();
        setTotal(0.0);
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    private void calculateCartTotal() {
        double total = 0.0;
        for (Item i : getItems()) {
            total += i.getSubtotal();
        }
        setTotal(total);
    }
}
