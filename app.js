
// Data
let accounts = [];

let nextId = 1;


// Get Elements

const form = document.getElementById("signupForm");

const nameInput = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const confirmPasswordInput = document.querySelector("#confirmPassword");
const confirmPasswordError = document.querySelector("#confirmPasswordError");

const submitBtn = document.querySelector("#submitBtn");
const formSuccess = document.querySelector("#formSuccess");


// Validation

let nameValid = false;
let emailValid = false;
let passwordValid = false;
let confirmPasswordValid = false;

formSuccess.style.display = "none";



function checkForm() {

    if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }

};


// Event Listeners

nameInput.addEventListener("input", (event) => {

    let name = event.target.value.trim();

    if (name.length < 3) {
        nameError.textContent = "Name must be at least 3 characters";
        nameValid = false;
    } else {
        nameError.textContent = "";
        nameValid = true;
    }

    checkForm();
})


emailInput.addEventListener("input", (event) => {

    let email = event.target.value.trim().toLowerCase();

    let emailExists = accounts.some((account) => {
        return account.email.toLowerCase() === email;
    })

    if (email === "") {
        emailError.textContent = "Email is required";
        emailValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Invalid email format";
        emailValid = false;
    } else if (emailExists) {
        emailError.textContent = "Email already exists";
        emailValid = false;
    } else {
        emailError.textContent = ""
        emailValid = true;
    }

    checkForm();
})


passwordInput.addEventListener("input", (event) => {

    let password = event.target.value;

    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        passwordValid = false;
    } else {
        passwordError.textContent = "";
        passwordValid = true;
    }

    // Check Confirm Password Again

    if (confirmPasswordInput.value !== "") {

        if (confirmPasswordInput.value !== password) {
            confirmPasswordError.textContent = "Passwords do not match";
            confirmPasswordValid = false;
        } else {
            confirmPasswordError.textContent = "";
            confirmPasswordValid = true;
        }

    }

    checkForm();
})


confirmPasswordInput.addEventListener("input", (event) => {

    let confirmPassword = event.target.value;

    if (confirmPassword === "") {
        confirmPasswordError.textContent = "Please confirm your password";
        confirmPasswordValid = false;
    } else if (confirmPassword !== passwordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        confirmPasswordValid = false;
    } else {
        confirmPasswordError.textContent = "";
        confirmPasswordValid = true;
    }

    checkForm();
})



form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (submitBtn.disabled) {
        return;
    }

    let newAccount = {
        id: nextId++,
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        password: passwordInput.value
    };

    accounts.push(newAccount);

    formSuccess.style.display = "block";


    form.reset();


    nameValid = false;
    emailValid = false;
    passwordValid = false;
    confirmPasswordValid = false;


    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";


    checkForm();
})
