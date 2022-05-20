package dto;

import java.util.ArrayList;

public class OrderDTO {
    private String orderId;
    private String custId;
    private String orderDate;
    private int discount;
    private double cost;
    private ArrayList<OrderDetailDTO> items;

    public OrderDTO() {
    }

    public OrderDTO(String orderId, String custId, String orderDate, int discount, double cost) {
        this.orderId = orderId;
        this.custId = custId;
        this.orderDate = orderDate;
        this.discount = discount;
        this.cost = cost;
    }

    public OrderDTO(String orderId, String custId, String orderDate, int discount, double cost, ArrayList<OrderDetailDTO> items) {
        this.setOrderId(orderId);
        this.setCustId(custId);
        this.setOrderDate(orderDate);
        this.setDiscount(discount);
        this.setCost(cost);
        this.setItems(items);
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public ArrayList<OrderDetailDTO> getItems() {
        return items;
    }

    public void setItems(ArrayList<OrderDetailDTO> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "OrderDTO{" +
                "orderId='" + orderId + '\'' +
                ", custId='" + custId + '\'' +
                ", orderDate='" + orderDate + '\'' +
                ", discount=" + discount +
                ", cost=" + cost +
                ", items=" + items +
                '}';
    }
}
