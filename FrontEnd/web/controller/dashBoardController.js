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

    if (customerDB.length>0){
        generateCustomerId();
    }else {
        $("#id").val("C00-0001");
    }
})

$("#itemBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'block');
    $("#placeOrderSection").css('display', 'none');

    if (itemDB.length>0){
        generateItemId();
    }else {
        $("#itemId").val("I00-0001");
    }
    loadAllItems();
})

$("#placeOrderBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'none');
    $("#placeOrderSection").css('display', 'block');

    $('#itemComboBox').empty();
    loadItemIds("<option>None</option>");

    for (let i = 0; i < itemDB.length; i++) {
        loadItemIds("<option>"+itemDB[i].getItemId()+"</option>");
    }

    if (orderDB.length>0){
        generateOrderId();
    }else {
        $("#exampleInputId2").val("O00-0001");
    }
})

/*picture buttons*/

$("#customerpicBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'block');
    $("#itemSection").css('display', 'none');
    $("#placeOrderSection").css('display', 'none');

    if (customerDB.length>0){
        generateCustomerId();
    }else {
        $("#id").val("C00-0001");
    }
})

$("#itempicBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'block');
    $("#placeOrderSection").css('display', 'none');

    $("#tblItem").empty();
    for (let i = 0; i < itemDB.length; i++) {
        var row = `<tr><td>${itemDB[i].itemId}</td><td>${itemDB[i].itemName}</td><td>${itemDB[i].itemUnitPrice}</td><td>${itemDB[i].itemQTYOnHand}</td></tr>`;
        console.log(row);
        $("#tblItem").append(row);
    }

    if (itemDB.length>0){
        generateItemId();
    }else {
        $("#itemId").val("I00-0001");
    }
})

$("#placeOrderpicBtn").click(function () {
    $("#homeSection").css('display', 'none');
    $("#customerSection").css('display', 'none');
    $("#itemSection").css('display', 'none');
    $("#placeOrderSection").css('display', 'block');

    if (orderDB.length>0){
        generateOrderId();
    }else {
        $("#exampleInputId2").val("O00-0001");
    }
})
