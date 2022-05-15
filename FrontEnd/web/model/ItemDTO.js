function ItemDTO(id, name, unitPrice, qtyOnHand) {
    var __id = id;
    var __name = name;
    var __unitPrice = unitPrice;
    var __qtyOnHand = qtyOnHand;

    this.setetItemId = function (id) {
        __id = id;
    }
    this.getItemId = function () {
        return __id;
    }
    this.setItemName = function (name) {
        __name = name;
    }
    this.getItemName = function () {
        return __name;
    }
    this.setItemUnitPrice = function (unitPrice) {
        __unitPrice = unitPrice;
    }
    this.getItemUnitPrice = function () {
        return __unitPrice;
    }
    this.setQtyOnHand = function (qtyOnHand) {
        __qtyOnHand = qtyOnHand;
    }
    this.getQtyOnHand = function () {
        return __qtyOnHand;
    }
}
