function validateForm() {
    let x = document.forms["compReg"]["email"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
    let y = document.forms["compReg"]["psw"].value;
    if (y == "") {
        alert("Name must be filled out");
        return false;
    }
}