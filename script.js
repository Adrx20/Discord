let regForm = document.getElementById("regForm");
let logForm = document.getElementById("logForm")
$("#logForm").hide();

$(".registered").on("click", () => {
    $("#regForm").hide();
    $("#logForm").show();
})

$(".required").on("click", () => {
    $("#regForm").show();
    $("#logForm").hide();
})

function showError(input, message) {
    const errorMessage = document.createElement("small");
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    input.parentElement.appendChild(errorMessage);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

regForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelectorAll("small").forEach(error => error.remove());

    let emailInput = e.target["email"];
    let loginInput = e.target["login"];
    let nameInput = e.target["name"];
    let passwordInput = e.target["password"];

    let isValid = true;

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email.");
        isValid = false;
    }

    if (loginInput.value.length <= 4) {
        showError(loginInput, "Login must be at least 4 characters");
        isValid = false;
    }

    if (nameInput.value.length <= 4) {
        showError(nameInput, "Name must be at least 4 characters");
        isValid = false;
    }

    if (passwordInput.value.length <= 6) {
        showError(passwordInput, "Password must be longer than 6 characters.");
        isValid = false;
    }

    if (isValid) {
        let reg = {
            email: emailInput.value,
            login: loginInput.value,
            name: nameInput.value,
            password: passwordInput.value
        };
        try {
            const response = await axios.post("http://localhost:3000/reg", reg)
            alert(response.data.message);
            regForm.reset();
            window.location.href = "main.html";
        } catch(error) {
            alert(error.response.data.message || "There is some problem with the email or name is already in use");
        };
    }
});

logForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelectorAll("small").forEach(error => error.remove());

    let emailInput = e.target["email-log"];
    let passwordInput = e.target["password-log"];

    let isValid = true;

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email.");
        isValid = false;
    }

    if (passwordInput.value.length <= 6) {
        showError(passwordInput, "Password must be longer than 6 characters.");
        isValid = false;
    }

    if (isValid) {
        let log = {
            email: emailInput.value,
            password: passwordInput.value
        };
        
        try {
            const response = await axios.post("http://localhost:3000/log", log);
            alert(response.data.message);  // Сообщение от сервера
            console.log('User:', response.data.user.message);  // Данные пользователя
            logForm.reset();
            window.location.href = "main.html";
        } catch (error) {
            alert(error.response?.data?.error || "Login failed.");
        }
    }
});