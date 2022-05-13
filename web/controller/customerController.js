//=========================================================================
//calling border colors
customerBorderColor();
//=========================================================================

//=========================================================================
// clearing text fields
function clearCustomerTextFields() {
    $("#id").val('');
    $("#name").val('');
    $("#address").val('');
    $("#telNo").val('');
}

//=========================================================================
// border colors
function customerBorderColor() {
    $("#id").css('border', '2px solid black');
    $("#name").css('border', '2px solid black');
    $("#address").css('border', '2px solid black');
    $("#telNo").css('border', '2px solid black');
}

//=========================================================================

//=========================================================================
//enter key press function of customer
$("#id").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#name").focus();
    }
});
$("#name").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#address").focus();
    }
});
$("#address").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#telNo").focus();
    }
});

//enter key press function of item
$("#id").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#name").focus();
    }
});
$("#name").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#address").focus();
    }
});
$("#address").keydown(function (event) {
    if ((event.keyCode == 13)) {
        $("#telNo").focus();
    }
});
//=========================================================================
/*Tab focus off*/
$('#id,#name,#address,#telNo').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});
//=========================================================================

// Customer
//validation of customer
const cusNameRegEx = /^[A-z ]{3,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{2,}$/;
const cusTelNoRegEx = /^[0-9]{10}$/;

$("#name").keyup(function () {

    let input = $("#name").val();

    if (cusNameRegEx.test(input)) {

        $("#name").css('border', '2px solid green');
        $("#errorname").text("");

    } else {

        $("#name").css('border', '2px solid red');
        $("#errorname").text("Wrong format");
    }
});

$("#address").keyup(function () {

    let input = $("#address").val();

    if (cusAddressRegEx.test(input)) {

        $("#address").css('border', '2px solid green');
        $("#erroraddress").text("");

    } else {

        $("#address").css('border', '2px solid red');
        $("#erroraddress").text("Wrong format");
    }
});

$("#telNo").keyup(function () {

    let input = $("#telNo").val();

    if (cusTelNoRegEx.test(input)) {

        $("#telNo").css('border', '2px solid green');
        $("#errortelNo").text("");

    } else {

        $("#telNo").css('border', '2px solid red');
        $("#errortelNo").text("Wrong format");
    }
});
//========================================================================
/*Row Click*/
/*function rowClick() {
    //selecting the table row
    $("#tblCustomer > tr").click(function () {

        let cusId = $(this).children(":eq(0)").text();
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusTelNo = $(this).children(":eq(3)").text();

        console.log(cusId, cusName, cusAddress, cusTelNo);

        $("#id").val(cusId);
        $("#name").val(cusName);
        $("#address").val(cusAddress);
        $("#telNo").val(cusTelNo);

    });
}*/

//=====================================================================
/*Save On Action*/
$("#saveBtn").click(function () {
    saveCustomer();
    loadAllCustomers();
    customerBorderColor();
    // clearing the text fields
    clearCustomerTextFields();
    if (customerDB.length>0){
        generateCustomerId();
    }else {
        $("#id").val("C00-0001");
    }
});

/*Update On Action*/
$("#updateBtn").click(function () {
    updateCustomer();
    loadAllCustomers();
    clearCustomerTextFields();
    if (customerDB.length>0){
        generateCustomerId();
    }else {
        $("#id").val("C00-0001");
    }
});

/*Delete On Action*/
$("#deleteBtn").click(function () {
    deleteCustomer();
    loadAllCustomers();
    clearCustomerTextFields();
    if (customerDB.length>0){
        generateCustomerId();
    }else {
        $("#id").val("C00-0001");
    }
});

/*Search On Action*/
$("#searchBtn").click(function () {
    var searchID = $("#exampleInputSearch").val();
    var response = searchCustomer(searchID);
    if (response!=null) {
        $("#id").val(customerDB[response].getCustomerId());
        $("#name").val(customerDB[response].getCustomerName());
        $("#address").val(customerDB[response].getCustomerAddress());
        $("#telNo").val(customerDB[response].getCustomerTelNo());

        $("#exampleInputSearch").val('');
    }else{
        clearCustomerTextFields();
        alert("No Such a Customer");
    }
});

// Customer Crud Operations
//START
function saveCustomer() {
    //gather customer information
    let customerId = $("#id").val();
    let customerName = $("#name").val();
    let customerAddress = $("#address").val();
    let customerTp = $("#telNo").val();

    loadCustomerIds("<option>"+customerId+"</option>");

    var customerDTO = new CustomerDTO(customerId,customerName,customerAddress,customerTp);
    customerDB.push(customerDTO);
}

function deleteCustomer() {
    var index = -1;

    for (var j = 0; j < customerDB.length; j++) {
        if ($('#tblCustomer>tr').id==(customerDB[j].getCustomerId())){
            //console.log(itemDB[j].getCustomerId());
            index = j;
        }
    }
    customerDB.splice(index,1);
}

function searchCustomer(searchID) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() == searchID) {
            return i;
        }
        else{
            return null;
        }
    }
}

function updateCustomer() {
    let customerId = $("#id").val();
    let customerName = $("#name").val();
    let customerAddress = $("#address").val();
    let customerTelNo = $("#telNo").val();

    for (var i = 0; i < customerDB.length; i++) {
        if (customerId==customerDB[i].getCustomerId()){
            customerDB[i].setCustomerId(customerId);
            customerDB[i].setCustomerName(customerName);
            customerDB[i].setCustomerAddress(customerAddress);
            customerDB[i].setCustomerTelNo(customerTelNo);
        }
    }
}
//END

function loadAllCustomers() {
    $("#tblCustomer").empty();
    for (var i = 0; i < customerDB.length; i++) {
        var row = `<tr><td>${customerDB[i].getCustomerId()}</td><td>${customerDB[i].getCustomerName()}</td><td>${customerDB[i].getCustomerAddress()}</td><td>${customerDB[i].getCustomerTelNo()}</td></tr>`;
        //console.log(row);
        $("#tblCustomer").append(row);
    }

    $("#tblCustomer>tr").click(function () {
        let cusId = $(this).children(":eq(0)").text();
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusTelNo = $(this).children(":eq(3)").text();

        //console.log(cusId, cusName, cusAddress, cusTelNo);

        $("#id").val(cusId);
        $("#name").val(cusName);
        $("#address").val(cusAddress);
        $("#telNo").val(cusTelNo);

    });

    $("#tblCustomer>tr").dblclick(function () {
        var index = -1;

        for (var j = 0; j < customerDB.length; j++) {
            if ($('#tblCustomer>tr').id==(customerDB[j].getCustomerId())){
                //console.log(itemDB[j].getCustomerId());
                index = j;
            }
        }

        customerDB.splice(index,1);
        $(this).remove();
        // clearing the text fields
        clearCustomerTextFields();
    });

}

//load all customerIds to the combo box
function loadCustomerIds(id) {
    $('#customerComboBox').append(id);
}

//generate customer id
function generateCustomerId() {
    var customerId = customerDB[customerDB.length - 1].getCustomerId();
    var tempId = parseInt(customerId.split("-")[1]);
    tempId = tempId + 1;
    if (tempId <= 9) {
        $("#id").val("C00-000" + tempId);
    } else if (tempId <= 99) {
        $("#id").val("C00-00" + tempId);
    } else if (tempId <= 999) {
        $("#id").val("C00-0" + tempId);
    } else {
        $("#id").val("C00-" + tempId);
    }
}