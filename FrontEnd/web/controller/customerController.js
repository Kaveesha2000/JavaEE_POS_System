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

//=====================================================================
/*Save On Action*/
$("#saveBtn").click(function () {
    saveCustomer();
    customerBorderColor();
    clearCustomerTextFields();
});

/*Update On Action*/
$("#updateBtn").click(function () {
    updateCustomer();
    loadAllCustomers();
    clearCustomerTextFields();
});

/*Delete On Action*/
$("#deleteBtn").click(function () {
    deleteCustomer();
    loadAllCustomers();
    clearCustomerTextFields();
});

/*Search On Action*/
$("#searchBtn").click(function () {

    let searchId = $("#exampleInputSearch").val();

   /* $.ajax({
        url: "http://localhost:8080/backend/customer?option=SEARCH&custId=" + searchId,
        method: "GET",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                let customer = res.data;
                $("#id").val(customer.custId);
                $("#name").val(customer.custName);
                $("#address").val(customer.custAddress);
                $("#telNo").val(customer.custContact);

            } else {
                alert(res);
            }

        },
        error: function (ob, status, t) {
            alert("Error");
            loadAllCustomers();
        }
    });*/
    $.ajax({
        url: "http://localhost:8080/backend/customer?option=SEARCH&custId=" +searchId,
        method: "GET",
        success: function (response) {
            $("#id").val(response.custId);
            $("#name").val(response.custName);
            $("#address").val(response.custAddress);
            $("#contact").val(response.custContact);
        },
        error: function (ob, statusText, error) {
            alert("No Such Customer");
            loadAllCustomers();
        }
    });
});

// Customer Crud Operations
//START
function saveCustomer() {
    var cusDetail = {
        custId: $("#id").val(),
        custName: $("#name").val(),
        custAddress: $("#address").val(),
        custContact: $("#telNo").val(),
    }
    $.ajax({
        url: "http://localhost:8080/backend/customer",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(cusDetail),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
                generateCustomerId();
            } else {
                alert(res.data);
                loadAllCustomers();
            }

        },
        error: function (ob, textStatus, error) {
            alert(error);
            loadAllCustomers();
        }
    });
}

function deleteCustomer() {
    let customerID = $("#id").val();

    $.ajax({
        url: "http://localhost:8080/backend/customer?custId=" + customerID,
        method: "DELETE",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
                generateCustomerId();
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }

        },
        error: function (ob, status, t) {
            alert("Error");
            loadAllCustomers();
        }
    });
}

function updateCustomer() {
    var cusDetail = {
        custId: $("#id").val(),
        custName: $("#name").val(),
        custAddress: $("#address").val(),
        custContact: $("#telNo").val(),
    }

    $.ajax({
        url: "http://localhost:8080/backend/customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(cusDetail),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
                generateCustomerId();
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

function loadAllCustomers() {
    $("#tblCustomer").empty();
    $.ajax({
        url: "http://localhost:8080/backend/customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp) {
                let row = `<tr><td>${customer.custId}</td><td>${customer.custName}</td><td>${customer.custAddress}</td><td>${customer.custContact}</td></tr>`;
                $("#tblCustomer").append(row);
            }
            custBindClickEvents();
        }
    });
}

//generate customer id
function generateCustomerId() {
    $("#id").val("C00-0001");

    $.ajax({
        url: "http://localhost:8080/backend/customer?option=GENERATECUSTOMERID",
        method: "GET",
        success: function (resp) {
            var custId = resp.custId;
                var tempId = parseInt(custId.split("-")[1]);
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

        },
        error: function (ob, statusText, error) {
        }

    });
}

function custBindClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        $("#id").val(id);
        $("#name").val(name);
        $("#address").val(address);
        $("#telNo").val(contact);
    });
}