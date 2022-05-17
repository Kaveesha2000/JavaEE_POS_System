// disable the purchase button
$("#purchaseBtn").prop('disabled', true);
//validation of place order
var regCash = /^[0-9]{2,10}(.)[0-9]{2}$/;
var regDiscount = /^[0-9]{1,2}$/;
var regOrderQty = /^[0-9]{1,20}$/;

$("#exampleInputOrderQty").keyup(function () {

    let input = $("#exampleInputOrderQty").val();

    if (regOrderQty.test(input)) {

        $("#exampleInputOrderQty").css('border', '2px solid green');
        $("#errorQty").text("");

    } else {
        $("#exampleInputOrderQty").css('border', '2px solid red');
        $("#errorQty").text("Wrong format");
    }
});

$("#exampleInputCash").keyup(function () {

    let input = $("#exampleInputCash").val();

    if (regCash.test(input)) {

        $("#exampleInputCash").css('border', '2px solid green');
        $("#errorCash").text("");

    } else {
        $("#exampleInputCash").css('border', '2px solid red');
        $("#errorCash").text("Wrong format");
    }
});

$("#discountComboBox").keyup(function () {

    let input = $("#discountComboBox").val();

    if (regDiscount.test(input)) {

        $("#discountComboBox").css('border', '2px solid green');
        $("#errorDiscount").text("");

    } else {
        $("#discountComboBox").css('border', '2px solid red');
        $("#errorDiscount").text("Wrong format");
    }
});

//generate order id
function generateOrderId() {
    $("#exampleInputId2").val("O00-0001");

    $.ajax({
        url: "http://localhost:8080/backend/placeorder?option=GENERATEORDERID",
        method: "GET",
        success: function (resp) {
            var orderId = resp.orderId;
            var tempId = parseInt(orderId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#exampleInputId2").val("O00-000" + tempId);
            } else if (tempId <= 99) {
                $("#exampleInputId2").val("O00-00" + tempId);
            } else if (tempId <= 999) {
                $("#exampleInputId2").val("O00-0" + tempId);
            } else {
                $("#exampleInputId2").val("O00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {
        }

    });
}

//load customer data to text field
$('#customerComboBox').click(function () {
    loadAllCustomerIds();
    disableCustomerField();
})

//load item data to text field
$('#itemComboBox').click(function () {
    loadAllItemIds();
    disableItemField();
})

//add to cart
$('#addBtn').click(function () {
    $("#purchaseBtn").prop('disabled', false);
    checkOrderQtyAndAddToCart();
    disableTotalField();
})

//purchase
$('#purchaseBtn').click(function () {
    var oId = $('#exampleInputId2').val();
    var cId = $('#customerComboBox').val();
    var date = $('#exampleInputDate').val();
    var cash = $('#exampleInputCash').val();
    var total = $('#exampleInputTotal').val();
    if ($('#discountComboBox').val() != '') {
        discount = parseInt($('#discountComboBox').val());
    } else {
        discount = 0;
    }
    var discount;
    var tblItemId;
    var tblItemName;
    var tblItemPrice;
    var tblItemQty;
    var tblItemTotal;

    let text = 'Do you want to purchase this order?';
    if (confirm(text) == true) {
        //calculating balance of the cash
        var balance = cash - (total - (total * discount / 100));

        for (let i = 0; i < $('#tblPlaceOrder tr').length; i++) {
            tblItemId = $("#tblPlaceOrder tr").children(':nth-child(1)')[i].innerText;
            tblItemName = $('#tblPlaceOrder tr').children(':nth-child(2)')[i].innerText;
            tblItemPrice = $('#tblPlaceOrder tr').children(':nth-child(3)')[i].innerText;
            tblItemQty = $('#tblPlaceOrder tr').children(':nth-child(4)')[i].innerText;
            tblItemTotal = $('#tblPlaceOrder tr').children(':nth-child(5)')[i].innerText;

            var orderDetailDTO = new OrderDetailDTO(oId, tblItemId, tblItemName, tblItemPrice, tblItemQty, tblItemTotal);
            orderDetailsDB.push(orderDetailDTO);
        }

        var orderDTO = new OrderDTO(oId, cId, date, discount, fullTotal);
        orderDB.push(orderDTO);

        $('#exampleInputBalance').val(balance);
        clearTextFields();

        fullTotal = 0;
    } else {
        for (let i = 0; i < $('#tblPlaceOrder tr').length; i++) {
            var itemId = $("#tblPlaceOrder tr").children(':nth-child(1)')[i].innerText;
            var itemQty = $('#tblPlaceOrder tr').children(':nth-child(4)')[i].innerText;

            addToPreviousQty(itemId, itemQty);
        }
    }
})

//load cart
var fullTotal = 0;

function loadCart() {
    var itemCode = $('#itemComboBox').val();
    var itemName = $('#exampleInputName2').val();
    var price = $('#exampleInputUnitPrice2').val();
    var orderqty = $('#exampleInputOrderQty').val();
    var qtyOnHand = $('#exampleInputQtyOnHand2').val();

    var total = 0;
    qtyOnHand = qtyOnHand - orderqty;

    //updating qty
    for (let i = 0; i < itemDB.length; i++) {
        if ($('#itemComboBox').val() == itemDB[i].getItemId()) {
            itemDB[i].setQtyOnHand(qtyOnHand);
            //console.log(qtyOnHand);
        }
    }
    //checking duplicates
    var newQty = 0;
    var newTotal = 0;

    //first check duplicates
    if (!checkDuplicates(itemCode)) {
        total = orderqty * price;
        fullTotal = fullTotal + total;
        var row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${price}</td><td>${orderqty}</td><td>${total}</td></tr>`;
        $("#tblPlaceOrder").append(row);
        $('#exampleInputTotal').val(fullTotal);
    } else {
        var rowNo = checkDuplicates(itemCode).rowNumber;
        newQty = parseInt($('#exampleInputOrderQty').val());
        var oldQty = parseInt($($('#tblPlaceOrder tr').eq(rowNo).children(":eq(3)")).text());
        //console.log(oldQty);
        var newQty1 = newQty + oldQty;
        newTotal = newQty * price;
        var newTotal1 = newQty1 * price;
        fullTotal = fullTotal + newTotal;
        //update the row
        $('#tblPlaceOrder tr').eq(rowNo).children(":eq(0)").text(itemCode);
        $('#tblPlaceOrder tr').eq(rowNo).children(":eq(1)").text(itemName);
        $('#tblPlaceOrder tr').eq(rowNo).children(":eq(2)").text(price);
        $('#tblPlaceOrder tr').eq(rowNo).children(":eq(3)").text(newQty1);
        $('#tblPlaceOrder tr').eq(rowNo).children(":eq(4)").text(newTotal1);
        $('#exampleInputTotal').val(fullTotal);
    }
    clickAndDoubleClick();
    //$('#exampleInputTotal').val(fullTotal);
}

//search existing order
$('#searchOrderBtn').click(function () {
    searchOrders();
})

//clearing the text fields
function clearTextFields() {
    $('#exampleInputName2,#exampleInputUnitPrice2,#exampleInputQtyOnHand2,#exampleInputOrderQty').val('');
    $('#itemComboBox').val('None');
}

//clearing the text fields
function clearTableAndFinalTotals() {
    $('#exampleInputTotal,#exampleInputCash,#exampleInputBalance,#exampleInputId2,#exampleInputDate,#customerName,#exampleInputTelephoneNo2,#exampleInputAddress2').val('');
    $('#discountComboBox').val('0.00');
    $('#customerComboBox').val('None');
    $('#tblPlaceOrder').empty();
}

//clearing whole order
$('#clearBtn').click(function () {
    clearTextFields();
    clearTableAndFinalTotals();
    if (orderDB.length > 0) {
        generateOrderId();
    } else {
        $("#exampleInputId2").val("O00-0001");
    }
})

function loadAllCustomerIds() {
    $("#customerComboBox").empty();
    $("#customerComboBox").append($("<option></option>").attr("value", 0).text("Select ID"));

    var customerIdsCount = 1;

    $.ajax({
        url: "http://localhost:8080/backend/customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (var customer of resp.data) {
                $("#customerComboBox").append($("<option></option>").attr("value", customerIdsCount).text(customer.custId));
                customerIdsCount++;
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

$("#customerComboBox").click(function () {
    /*var code = $("#customerComboBox").val();
    $.ajax({
        url: "http://localhost:8080/backend/customer?option=SEARCH&custId=" + code,
        method: "GET",
        success: function (resp) {
            $("#customerName").val(resp.custName);
            $("#exampleInputTelephoneNo2").val(resp.custContact);
            $("#exampleInputAddress2").val(resp.custAddress);
        },
        error: function (ob, statusText, error) {
        }
    });*/

    var code = $("#customerComboBox").val();
    $.ajax({
        url: "http://localhost:8080/backend/customer?option=GETALL",
        method: "GET",
        success:function (res){
            for (const customer of res.data){
                if(customer.custId == code){

                    $("#customerName").val(customer.custName);
                    $("#exampleInputTelephoneNo2").val(customer.custContact);
                    $("#exampleInputAddress2").val(customer.custAddress);
                }
            }
        }
    })
    
});

function loadAllItemIds() {
    $("#itemComboBox").empty();
    $("#itemComboBox").append($("<option></option>").attr("value", 0).text("Select ID"));

    var itemIdsCount = 1;

    $.ajax({
        url: "http://localhost:8080/backend/item?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (var item of resp.data) {
                $("#itemComboBox").append($("<option></option>").attr("value", itemIdsCount).text(item.itemId));
                itemIdsCount++;
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}


$("#itemComboBox").click(function () {

    var code = $("#itemComboBox").val();
    $.ajax({
        url: "http://localhost:8080/backend/item?option=GETALL",
        method: "GET",
        success:function (res){
            for (const item of res.data){
                if(item.itemId == code){

                    $("#exampleInputName2").val(item.itemName);
                    $("#exampleInputUnitPrice2").val(item.unitPrice);
                    $("#exampleInputQtyOnHand2").val(item.qtyOnHand);
                }
            }
        }
    })

});

//checking duplicates
function checkDuplicates(itemCode) {
    for (let i = 0; i < $('#tblPlaceOrder tr').length; i++) {
        // get the first row
        //not working at the first time
        if (itemCode == $('#tblPlaceOrder').children().eq(i).children().eq(0).text()) {
            return {
                "rowNumber": i
            };
            break;
        }
    }
    return false;
}

//checking order qty
function checkOrderQtyAndAddToCart() {
    var qtyOnHand = parseInt($('#exampleInputQtyOnHand2').val());
    var orderQty = parseInt($('#exampleInputOrderQty').val());
    if (orderQty > qtyOnHand) {
        alert(orderQty + ' order quantity is exceed than quantity on hand...! Try Again...!');
        $('#exampleInputOrderQty').val('');
    } else {
        loadCart();
        clearTextFields();
    }
}

//search orders
function searchOrders() {
    var orderId = $('#orderSearchBar').val();
    var ifExist = false;

    for (let i = 0; i < orderDB.length; i++) {
        if (orderId == orderDB[i].getOrderId()) {
            ifExist = true;
        }
    }
    if (ifExist == true) {
        for (let i = 0; i < orderDB.length; i++) {
            //from order db
            for (var j = 0; j < orderDB.length; j++) {
                if (orderId == orderDB[i].getOrderId()) {
                    $("#exampleInputId2").val(orderId);
                    $("#customerComboBox").val(orderDB[j].getCustomerID());
                    $("#exampleInputDate").val(orderDB[j].getDate());
                    $("#discountComboBox").val(orderDB[j].getDiscount());
                    $("#exampleInputTotal").val(orderDB[j].getTotal());
                }
            }
            //from customer db
            for (var j = 0; j < customerDB.length; j++) {
                if ($("#customerComboBox").val() == customerDB[i].getCustomerId()) {
                    $("#customerName").val(customerDB[j].getCustomerName());
                    $("#exampleInputTelephoneNo2").val(customerDB[j].getCustomerTelNo());
                    $("#exampleInputAddress2").val(customerDB[j].getCustomerAddress());
                }
            }
            for (var j = 0; j < orderDetailsDB.length; j++) {
                if (orderId == orderDetailsDB[j].getOrderid()) {
                    let raw = `<tr><td> ${orderDetailsDB[j].getItemCode()} </td><td> ${orderDetailsDB[j].getItemName()} </td><td> ${orderDetailsDB[j].getItemUnitPrice()} </td><td> ${orderDetailsDB[j].getItemQty()} </td><td> ${orderDetailsDB[j].getTotAmount()} </td></tr>`;
                    $("#tblPlaceOrder").append(raw);
                }
            }
        }
        $('#orderSearchBar').val('');
    } else {
        alert('There is no any order related to ' + orderId);
    }
}

function addToPreviousQty(itemId, itemQty) {
    var qty = parseInt(itemQty);
    for (let i = 0; i < itemDB.length; i++) {
        if (itemId == itemDB[i].getItemId()) {
            var qtyOnHand = itemDB[i].getQtyOnHand();
            //console.log(qtyOnHand);
            qtyOnHand += qty;
            //console.log(qty);
            itemDB[i].setQtyOnHand(qtyOnHand);
        }
    }
}

//click and double click
function clickAndDoubleClick() {
    let itemId = 0;
    let orderQty = 0;
    let unitPrice = 0;

    $("#tblPlaceOrder>tr").click(function () {
        itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        unitPrice = parseInt($(this).children(":eq(2)").text());
        orderQty = parseInt($(this).children(":eq(3)").text());

        $("#itemComboBox").val(itemId);
        $("#exampleInputName2").val(itemName);
        $("#exampleInputUnitPrice2").val(unitPrice);
        $("#exampleInputOrderQty").val(orderQty);
    });

    $("#tblPlaceOrder>tr").dblclick(function () {
        var index = -1;

        for (var j = 0; j < orderDetailsDB.length; j++) {
            if ($('#tblCustomer>tr').id == (orderDetailsDB[j].getItemCode())) {
                index = j;
            }
        }

        addToPreviousQty(itemId, orderQty);
        fullTotal = fullTotal - (unitPrice * orderQty);
        $('#exampleInputTotal').val(fullTotal);
        orderDetailsDB.splice(index, 1);
        $(this).remove();
        clearTextFields();
    });
}

// disable the customer fields
function disableCustomerField() {
    $("#customerName").prop('disabled', true);
    $("#exampleInputTelephoneNo2").prop('disabled', true);
    $("#exampleInputAddress2").prop('disabled', true);
}

// disable the item fields
function disableItemField() {
    $("#exampleInputName2").prop('disabled', true);
    $("#exampleInputUnitPrice2").prop('disabled', true);
    $("#exampleInputQtyOnHand2").prop('disabled', true);
    $("#exampleInputTotal").prop('disabled', true);
}

// disable the purchase details fields
function disableTotalField() {
    $("#exampleInputTotal").prop('disabled', true);
}
