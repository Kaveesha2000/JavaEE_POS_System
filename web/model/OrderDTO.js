function OrderDTO(orderId, customerId, date, discount, fullTotal) {
    var __oId = orderId;
    var __cId = customerId;
    var __date = date;
    var __discount = discount;
    var __fullTotal = fullTotal;

    this.setOrderId = function (orderId) {
        __oId = orderId;
    }
    this.getOrderId = function () {
        return __oId;
    }
    this.setCustomerID = function (customerId) {
        __cId = customerId;
    }
    this.getCustomerID = function () {
        return __cId;
    }
    this.setDate = function (date) {
        __date = date;
    }
    this.getDate = function () {
        return __date;
    }
    this.setDiscount = function (discount) {
        __discount = discount;
    }
    this.getDiscount = function () {
        return __discount;
    }
    this.setTotal = function (fullTotal) {
        __fullTotal = fullTotal;
    }
    this.getTotal = function () {
        return __fullTotal;
    }
}