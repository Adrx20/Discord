let regForm = document.getElementById("regForm")
let regInfo = [];

regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let reg = {
        email: e.target["email"].value,
        login: e.target["login"].value,
        name: e.target["name"].value,
        password: e.target["password"].value
    }
    console.log(reg);
    
    if (reg.email != null) {
        if (reg.login.length >= 4 && reg.name.length >= 4) {
            if (reg.password.length > 6) {
                regInfo.push(reg);
                alert("You are successfully registered");
                e.target.reset()
            } else {
                alert("Password must be longer than 6 characters");
            }
        } else {
            alert("Login and name must be no longer than 4 characters");
        }
    } else {
        alert("Some problem with the email");
    }
    

    
    console.log(reg);
    

    // let xhr = XMLHttpRequest();
    // xhr.open("POST", "/reg", true)
    // xhr.responseType = "json";
    // xhr.send()
    // xhr.onload = () => {
    //     console.log(formInf);
    // }


})