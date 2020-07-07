package com.example.cart_service;

public class Item {
    private int id;
    private String title;
    private String description;
    private double unitPrice;
    private int quantity;
    private double subtotal;

    public Item(){}

    public Item(int id, String title, String description, double unitPrice, int quantity) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        calculateSubtotal();
    }

    public int getId() {
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
        calculateSubtotal();
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
        calculateSubtotal();
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    private void calculateSubtotal(){
        setSubtotal(quantity * unitPrice);
    }
}
