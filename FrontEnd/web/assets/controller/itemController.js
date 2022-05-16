//=========================================================================
//calling border colors
itemBorderColor();
//=========================================================================

//=========================================================================
// clearing text fields

function clearItemTextFields() {
    $("#itemId").val('');
    $("#itemName").val('');
    $("#itemUnitPrice").val('');
    $("#itemQTYOnHand").val('');
}

//=========================================================================
// border colors

function itemBorderColor() {
    $("#itemId").css('border', '2px solid black');
    $("#itemName").css('border', '2px solid black');
    $("#itemUnitPrice").css('border', '2px solid black');
    $("#itemQTYOnHand").css('border', '2px solid black');
}
//=========================================================================

//=========================================================================
//enter key press function of item
$("#itemId").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#itemName").focus();
    }
});
$("#itemName").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#itemUnitPrice").focus();
    }
});
$("#itemUnitPrice").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#itemQTYOnHand").focus();
    }
});
//=========================================================================
/*Tab focus off*/
$('#itemId,#itemName,#itemUnitPrice,#itemQTYOnHand').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});
//=========================================================================

// Item
/*selecting the button*/
//validation of item
const itemNameRegEx = /^[A-z]{1,20}$/;
const itemUnitPriceRegEx = /^[0-9]{2,8}$/;
const itemQTYOnHand = /^[0-9]{1,10}$/;

$("#itemName").keyup(function () {

    let input = $("#itemName").val();

    if (itemNameRegEx.test(input)) {

        $("#itemName").css('border', '2px solid green');
        $("#errorItemname").text("");

    } else {

        $("#itemName").css('border', '2px solid red');
        $("#errorItemname").text("Wrong format");
    }
});

$("#itemUnitPrice").keyup(function () {

    let input = $("#itemUnitPrice").val();

    if (itemUnitPriceRegEx.test(input)) {

        $("#itemUnitPrice").css('border', '2px solid green');
        $("#errorItemUnitPrice").text("");

    } else {

        $("#itemUnitPrice").css('border', '2px solid red');
        $("#errorItemUnitPrice").text("Wrong format");
    }
});

$("#itemQTYOnHand").keyup(function () {

    let input = $("#itemQTYOnHand").val();

    if (itemQTYOnHand.test(input)) {

        $("#itemQTYOnHand").css('border', '2px solid green');
        $("#errorItemQTYOnHand").text("");

    } else {

        $("#itemQTYOnHand").css('border', '2px solid red');
        $("#errorItemQTYOnHand").text("Wrong format");
    }
});

//========================================================================
/* Row Click */
function rowClick() {
    //selecting the table row
    $("#tblItem > tr").click(function () {

        let itId = $(this).children(":eq(0)").text();
        let itName = $(this).children(":eq(1)").text();
        let itUnitPrice = $(this).children(":eq(2)").text();
        let itQtyOnHand = $(this).children(":eq(3)").text();

        console.log(itId, itName, itUnitPrice, itQtyOnHand);

        $("#itemId").val(itId);
        $("#itemName").val(itName);
        $("#itemUnitPrice").val(itUnitPrice);
        $("#itemQTYOnHand").val(itQtyOnHand);

    });
}
//========================================================================

/*Save On Action*/
$("#saveBtnItem").click(function () {
    saveItem();
    loadAllItems();
    itemBorderColor();
    clearItemTextFields();
    /*if (itemDB.length>0){
        generateItemId();
    }else {
        $("#itemId").val("I00-0001");
    }*/
});

/*Update On Action*/
$("#updateItem").click(function () {
    updateItem();
    loadAllItems();
    clearItemTextFields();
    /*if (itemDB.length>0){
        generateItemId();
    }else {
        $("#itemId").val("I00-0001");
    }*/
})

/*Delete On Action*/
$("#deleteBtnItem").click(function () {
    deleteItem();
    loadAllItems();
    clearItemTextFields();
    /*if (itemDB.length>0){
        generateItemId();
    }else {
        $("#itemId").val("I00-0001");
    }*/
})

/*Search On Action*/
$("#searchBtnItem").click(function () {
    var searchID = $("#exampleInputSearch1").val();
    var response = searchItem(searchID);
    if (response!=null) {
        $("#itemId").val(itemDB[response].getItemId());
        $("#itemName").val(itemDB[response].getItemName());
        $("#itemUnitPrice").val(itemDB[response].getItemUnitPrice());
        $("#itemQTYOnHand").val(itemDB[response].getItemQty());

        $("#exampleInputSearch1").val('');
    }else{
        clearItemTextFields();
        alert("No Such a Item");
    }
});

// Item CRUD Operation
//START
function saveItem() {
    var data = $("#itemForm").serialize();
    $.ajax({
        url: "http://localhost:8080/backend/item",
        method: "POST",
        data: data,// if we send data with the request
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllItems();
            } else {
                alert(res.data);
                loadAllItems();
            }

        },
        error: function (ob, textStatus, error) {
            alert(error);
            loadAllItems();
        }
    });
}

function deleteItem() {
    let itemId = $("#itemId").val();

    $.ajax({
        url: "http://localhost:8080/backend/item?itemId=" + itemId,
        method: "DELETE",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                loadAllItems();
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }

        },
        error: function (ob, status, t) {
            alert("Error");
            loadAllItems();
        }
    });
}

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemId() == id) {
            return i;
        }
        else {
            return null;
        }
    }
}

function updateItem() {
    var itemOb = {
        id: $("#itemId").val(),
        name: $("#itemName").val(),
        unitPrice: $("#itemUnitPrice").val(),
        qtyOnHand: $("#itemQTYOnHand").val()
    }

    $.ajax({
        url: "http://localhost:8080/backend/item",
        method: "PUT",
        contentType: "application/json", //You should state request's content type using MIME types
        data: JSON.stringify(itemOb), // format js object to valid json string
        success: function (res) {
            if (res.status == 200) { // process is  ok
                alert(res.message);
                loadAllItems();
            } else if (res.status == 400) { // there is a problem with the client side
                alert(res.message);
            } else {
                alert(res.data); // else maybe there is an exception
            }
        },
        error: function (ob, errorStus) {
            //console.log(ob); // other errors
            alert(ob);
        }
    });
}
//END

function loadAllItems() {
    $("#tblItem").empty();
    $.ajax({
        url: "http://localhost:8080/backend/item?option=GETALL",
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {
            //console.log(resp);
            for (const item of resp.data) {
                let row = `<tr><td>${item.itemId}</td><td>${item.itemName}</td><td>${item.unitPrice}</td><td>${item.qtyOnHand}</td></tr>`;
                $("#tblItem").append(row);
            }
            bindClickEvents();
        }
    });
}

//load all itemIds to the item combo box
function loadItemIds(itemId) {
    $('#itemComboBox').append(itemId);
}

//generate item id
function generateItemId() {
    var itemId = itemDB[itemDB.length - 1].getItemId();
    var tempId = parseInt(itemId.split("-")[1]);
    tempId = tempId + 1;
    if (tempId <= 9) {
        $("#itemId").val("I00-000" + tempId);
    } else if (tempId <= 99) {
        $("#itemId").val("I00-00" + tempId);
    } else if (tempId <= 999) {
        $("#itemId").val("I00-0" + tempId);
    } else {
        $("#itemId").val("I00-" + tempId);
    }
}

function bindClickEvents() {
    $("#tblItem>tr").click(function () {
        //Get values from the selected row
        let itemId = $(this).children().eq(0).text();
        let itemName = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qtyOnHand = $(this).children().eq(3).text();

        //Set values to the text-fields
        $("#itemId").val(itemId);
        $("#itemName").val(itemName);
        $("#itemUnitPrice").val(unitPrice);
        $("#itemQTYOnHand").val(qtyOnHand);
    });
}