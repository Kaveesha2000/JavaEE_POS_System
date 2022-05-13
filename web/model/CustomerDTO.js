function CustomerDTO(id, name, address, telNo) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __telNo = telNo;

    this.setCustomerId = function (id) {
        __id = id;
    }
    this.getCustomerId = function () {
        return __id;
    }
    this.setCustomerName = function (name) {
        __name = name;
    }
    this.getCustomerName = function () {
        return __name;
    }
    this.setCustomerAddress = function (address) {
        __address = address;
    }
    this.getCustomerAddress = function () {
        return __address;
    }
    this.setCustomerTelNo = function (telNo) {
        __telNo = telNo;
    }
    this.getCustomerTelNo = function () {
        return __telNo;
    }
}
