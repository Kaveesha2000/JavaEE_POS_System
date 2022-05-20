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
    itemBorderColor();
    clearItemTextFields();
});

/*Update On Action*/
$("#updateItem").click(function () {
    updateItem();
    itemBorderColor();
    clearItemTextFields();
})

/*Delete On Action*/
$("#deleteBtnItem").click(function () {
    deleteItem();
    itemBorderColor();
    clearItemTextFields();
})

/*Search On Action*/
$("#searchBtnItem").click(function () {
    let searchId = $("#exampleInputSearch1").val();

    $.ajax({
        url: "http://localhost:8080/backend/item?option=SEARCH&itemId=" + searchId,
        method: "GET",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                let item = res.data;
                $("#itemId").val(item.itemId);
                $("#itemName").val(item.itemName);
                $("#itemUnitPrice").val(item.unitPrice);
                $("#itemQTYOnHand").val(item.qtyOnHand);

            } else {
                alert(res.data);
            }

        },
        error: function (ob, status, t) {
            alert("Error");
            loadAllItems();
        }
    });
});

// Item CRUD Operation
//START
function saveItem() {
    var itemDetail = {
        itemId: $("#itemId").val(),
        itemName: $("#itemName").val(),
        unitPrice: $("#itemUnitPrice").val(),
        qtyOnHand: $("#itemQTYOnHand").val(),
    }

    $.ajax({
        url: "http://localhost:8080/backend/item",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(itemDetail),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllItems();
                generateItemId();
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
                generateItemId();
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

function updateItem() {
    var itemOb = {
        itemId: $("#itemId").val(),
        itemName: $("#itemName").val(),
        unitPrice: $("#itemUnitPrice").val(),
        qtyOnHand: $("#itemQTYOnHand").val()
    }

    $.ajax({
        url: "http://localhost:8080/backend/item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itemOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllItems();
                generateItemId();
            } else if (res.status == 400) {
                alert(res.message);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, errorStus) {
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
        success: function (resp) {
            for (const item of resp) {
                let row = `<tr><td>${item.itemId}</td><td>${item.itemName}</td><td>${item.unitPrice}</td><td>${item.qtyOnHand}</td></tr>`;
                $("#tblItem").append(row);
            }
            itemBindClickEvents();
        }
    });
}

//generate item id
function generateItemId() {
    $("#itemId").val("I00-0001");

    $.ajax({
        url: "http://localhost:8080/backend/item?option=GENERATEITEMID",
        method: "GET",
        success: function (resp) {
            var itemId = resp.itemId;
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
        },
        error: function (ob, statusText, error) {
        }

    });
}

function itemBindClickEvents() {
    $("#tblItem>tr").click(function () {
        let itemId = $(this).children().eq(0).text();
        let itemName = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qtyOnHand = $(this).children().eq(3).text();

        $("#itemId").val(itemId);
        $("#itemName").val(itemName);
        $("#itemUnitPrice").val(unitPrice);
        $("#itemQTYOnHand").val(qtyOnHand);
    });
}