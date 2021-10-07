
function displayMessage() {
    let msg = "";

    msg = document.getElementById("message").value;

    alert(msg);
}


function displayMessage2() {
    let msg = "";

    msg = document.getElementById("message").value;

    Swal.fire(msg);
}


// Two functions
// function displayMessage(msg) {

//     alert(msg);
// }

// function getMessage() {
//     let msg = "";

//     msg = document.getElementById("message").value;

//     displayMessage(msg);
// }