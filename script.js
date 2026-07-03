function calculatePrice() {

    // Get customer information
    let customerName = document.getElementById("customerName").value;
    let phone = document.getElementById("phone").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let service = document.getElementById("service").value;
    let weight = parseFloat(document.getElementById("weight").value);

    let price = 0;

    // Validation
    if (customerName == "") {
        alert("Please enter your name.");
        return;
    }

    if (phone == "") {
        alert("Please enter your phone number.");
        return;
    }

    if (date == "") {
        alert("Please select a booking date.");
        return;
    }

    if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight.");
        return;
    }

    // Calculate price
    switch (service) {

        case "Wash":
            price = 3;
            break;

        case "Wash & Dry":
            price = 7;
            break;

        case "Dry":
            price = 4;
            break;

        default:
            alert("Please select a service.");
            return;
    }

    let total = price * weight;

    // Generate Booking ID
    let bookingNumber = localStorage.getItem("bookingNumber");

    if (bookingNumber == null) {

        bookingNumber = 1001;

    } else {

        bookingNumber = parseInt(bookingNumber) + 1;

    }

    let bookingID = "WW" + bookingNumber;

    // Save Booking ID
    localStorage.setItem("bookingNumber", bookingNumber);
    localStorage.setItem("bookingID", bookingID);

    // Save Customer Information
    localStorage.setItem("customerName", customerName);
    localStorage.setItem("phone", phone);
    localStorage.setItem("date", date);
    localStorage.setItem("time", time);
    localStorage.setItem("service", service);
    localStorage.setItem("weight", weight);
    localStorage.setItem("totalPrice", total);

    // =========================
    // SAVE BOOKING HISTORY
    // =========================

    let history =
    JSON.parse(localStorage.getItem("bookingHistory")) || [];

    history.push({

        bookingID: bookingID,

        customerName: customerName,

        phone: phone,

        date: date,

        time: time,

        service: service,

        weight: weight,

        total: total,

        status: "Pending"

    });

    localStorage.setItem(
        "bookingHistory",
        JSON.stringify(history)
    );

    // Go to Payment Page
    alert("Total Price : RM " + total.toFixed(2));

    window.location.href = "payment.html";

}