package entity;

public class Order {
    private String orderId;
    private String custId;
    private String orderDate;
    private int discount;
    private double cost;

    public Order() {
    }

    public Order(String orderId, String custId, String orderDate, int discount, double cost) {
        this.setOrderId(orderId);
        this.setCustId(custId);
        this.setOrderDate(orderDate);
        this.setDiscount(discount);
        this.setCost(cost);
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

    @Override
    public String toString() {
        return "Order{" +
                "orderId='" + orderId + '\'' +
                ", custId='" + custId + '\'' +
                ", orderDate='" + orderDate + '\'' +
                ", discount=" + discount +
                ", cost=" + cost +
                '}';
    }
}
