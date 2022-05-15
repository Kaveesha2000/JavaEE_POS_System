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
    if (itemDB.length>0){
        generateItemId();
    }else {
        $("#itemId").val("I00-0001");
    }
});

/*Update On Action*/
$("#updateItem").click(function () {
    updateItem();
    loadAllItems();
    clearItemTextFields();
    if (itemDB.length>0){
        generateItemId();
    }else {
        $("#itemId").val("I00-0001");
    }
})

/*Delete On Action*/
$("#deleteBtnItem").click(function () {
    deleteItem();
    loadAllItems();
    clearItemTextFields();
    if (itemDB.length>0){
        generateItemId();
    }else {
        $("#itemId").val("I00-0001");
    }
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
    //gather customer information
    let itemId = $("#itemId").val();
    let itemName = $("#itemName").val();
    let itemUnitPrice = $("#itemUnitPrice").val();
    let itemQTYOnHand = $("#itemQTYOnHand").val();

    //loadItemIds("<option>"+itemId+"</option>");

    var itemDTO = new ItemDTO(itemId,itemName,itemUnitPrice,itemQTYOnHand);
    itemDB.push(itemDTO);
}

function deleteItem() {
    var index = -1;

    for (var j = 0; j < itemDB.length; j++) {
        if ($('#tblItem>tr').itemId==(itemDB[j].getItemId())){
            //console.log(itemDB[j].getItemId());
            index = j;
        }
    }

    itemDB.splice(index,1);
    // clearing the text fields
    clearItemTextFields();
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
    let itemId = $("#itemId").val();
    let itemName = $("#itemName").val();
    let itemUnitPrice = $("#itemUnitPrice").val();
    let itemQTYOnHand = $("#itemQTYOnHand").val();

    for (var i = 0; i < itemDB.length; i++) {
        if (itemId==itemDB[i].getItemId()){
            itemDB[i].setetItemId(itemId);
            itemDB[i].setItemName(itemName);
            itemDB[i].setItemUnitPrice(itemUnitPrice);
            itemDB[i].setQtyOnHand(itemQTYOnHand);
        }
    }
}
//END

function loadAllItems() {
    $("#tblItem").empty();
    for (let i = 0; i < itemDB.length; i++) {
        var row = `<tr><td>${itemDB[i].getItemId()}</td><td>${itemDB[i].getItemName()}</td><td>${itemDB[i].getItemUnitPrice()}</td><td>${itemDB[i].getQtyOnHand()}</td></tr>`;
        //console.log(row);
        $("#tblItem").append(row);
    }

    //disabling the row addings
    $("#tblItem > tr").off('click');

    rowClick();

    $("#tblItem > tr").off('dblclick');

    $("#tblItem > tr").dblclick(function () {
        var index = -1;

        for (var j = 0; j < itemDB.length; j++) {
            if ($('#tblItem>tr').itemId==(itemDB[j].getItemId())){
                console.log(itemDB[j].getItemId());
                index = j;
            }
        }

        itemDB.splice(index,1);
        $(this).remove();
        // clearing the text fields
        clearItemTextFields();
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