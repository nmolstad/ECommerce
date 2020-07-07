package com.example.cart_service;

public class Item {
    private int id;
    private String title;
    private String description;
    private double unitPrice;

    public Item(){}

    public Item(int id, String title, String description, double unitPrice) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.unitPrice = unitPrice;
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
    }


}
