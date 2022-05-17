$("#homeSection").css('display', 'block');
$("#customerSection").css('display', 'none');
$("#itemSection").css('display', 'none');
$("#placeOrderSection").css('display', 'none');

$("#homeBtn").click(function () {
    $("#homeSection").css('display', 'block');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'none');
    $("#placeOrderSection").css('display', 'none');
})

$("#customerBtn").click(function () {

    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'block');
    $("#itemSection").css('display', 'none');
    $("#placeOrderSection").css('display', 'none');

    loadAllCustomers();
    generateCustomerId();
})

$("#itemBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'block');
    $("#placeOrderSection").css('display', 'none');

    generateItemId();
    loadAllItems();
})

$("#placeOrderBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'none');
    $("#placeOrderSection").css('display', 'block');

    /*$('#itemComboBox').empty();
    loadItemIds("<option>None</option>");

    for (let i = 0; i < itemDB.length; i++) {
        loadItemIds("<option>"+itemDB[i].getItemId()+"</option>");
    }*/

    generateOrderId();

})

/*picture buttons*/

$("#customerpicBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'block');
    $("#itemSection").css('display', 'none');
    $("#placeOrderSection").css('display', 'none');

    loadAllCustomers();
    generateCustomerId();
})

$("#itempicBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'block');
    $("#placeOrderSection").css('display', 'none');

    generateItemId();
    loadAllItems();

    /*$("#tblItem").empty();
    for (let i = 0; i < itemDB.length; i++) {
        var row = `<tr><td>${itemDB[i].itemId}</td><td>${itemDB[i].itemName}</td><td>${itemDB[i].itemUnitPrice}</td><td>${itemDB[i].itemQTYOnHand}</td></tr>`;
        console.log(row);
        $("#tblItem").append(row);
    }*/
})

$("#placeOrderpicBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'none');
    $("#placeOrderSection").css('display', 'block');

    generateOrderId();

})
