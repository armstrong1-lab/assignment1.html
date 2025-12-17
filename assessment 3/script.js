// ===============================
// Form Input Validation Project
// Uses window API: prompt(), alert()
// Bonus: real-time validation feedback
// ===============================

// Optional: window API prompt demo (allowed by assignment)
const visitorName = prompt("Welcome! What is your first name?");
if (visitorName && visitorName.trim() !== "") {
  alert("Hi " + visitorName.trim() + "! Please complete the registration form.");
} else {
  alert("Welcome! Please complete the registration form.");
}

// Get form + input elements
const form = document.getElementById("registerForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const age = document.getElementById("age");

// Message elements
const fullNameMsg = document.getElementById("fullNameMsg");
const emailMsg = document.getElementById("emailMsg");
const passwordMsg = document.getElementById("passwordMsg");
const confirmPasswordMsg = document.getElementById("confirmPasswordMsg");
const ageMsg = document.getElementById("ageMsg");

// Helpers for visual feedback (bonus)
function showValid(input, msgEl, message) {
  input.style.border = "2px solid green";
  msgEl.style.color = "green";
  msgEl.textContent = message;
}

function showInvalid(input, msgEl, message) {
  input.style.border = "2px solid red";
  msgEl.style.color = "red";
  msgEl.textContent = message;
}

// Validation functions
function validateFullName() {
  const value = fullName.value.trim();

  if (value === "") {
    showInvalid(fullName, fullNameMsg, "Full Name cannot be empty.");
    return "Full Name cannot be empty.";
  }

  const words = value.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    showInvalid(fullName, fullNameMsg, "Enter at least 2 words (first and last name).");
    return "Full Name must contain at least 2 words.";
  }

  showValid(fullName, fullNameMsg, "Full Name looks good.");
  return "";
}

function validateEmail() {
  const value = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(value)) {
    showInvalid(email, emailMsg, "Enter a valid email (example@domain.com).");
    return "Email Address must be a valid format (example@domain.com).";
  }

  showValid(email, emailMsg, "Email looks good.");
  return "";
}

function validatePassword() {
  const value = password.value;

  const lengthOk = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[^A-Za-z0-9]/.test(value);

  if (!lengthOk || !hasUpper || !hasNumber || !hasSpecial) {
    showInvalid(
      password,
      passwordMsg,
      "8+ chars, 1 uppercase, 1 number, 1 special character required."
    );
    return "Password must be 8+ chars with 1 uppercase, 1 number, and 1 special character.";
  }

  showValid(password, passwordMsg, "Password is strong.");
  return "";
}

function validateConfirmPassword() {
  const value = confirmPassword.value;

  if (value === "") {
    showInvalid(confirmPassword, confirmPasswordMsg, "Confirm Password cannot be empty.");
    return "Confirm Password cannot be empty.";
  }

  if (value !== password.value) {
    showInvalid(confirmPassword, confirmPasswordMsg, "Passwords do not match.");
    return "Confirm Password must match Password.";
  }

  showValid(confirmPassword, confirmPasswordMsg, "Passwords match.");
  return "";
}

function validateAge() {
  const value = age.value.trim();
  const ageNum = Number(value);

  if (value === "" || Number.isNaN(ageNum)) {
    showInvalid(age, ageMsg, "Age must be a valid number.");
    return "Age must be a valid number.";
  }

  if (ageNum < 18) {
    showInvalid(age, ageMsg, "You must be 18 or older.");
    return "Age must be 18 or older.";
  }

  showValid(age, ageMsg, "Age is valid.");
  return "";
}

// BONUS: Real-time validation events
fullName.addEventListener("input", validateFullName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", () => {
  validatePassword();
  if (confirmPassword.value.trim() !== "") validateConfirmPassword();
});
confirmPassword.addEventListener("input", validateConfirmPassword);
age.addEventListener("input", validateAge);

// Submit validation
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent submission by default

  const errors = [];

  const fullNameError = validateFullName();
  if (fullNameError) errors.push(fullNameError);

  const emailError = validateEmail();
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword();
  if (passwordError) errors.push(passwordError);

  const confirmPasswordError = validateConfirmPassword();
  if (confirmPasswordError) errors.push(confirmPasswordError);

  const ageError = validateAge();
  if (ageError) errors.push(ageError);

  // If errors, alert them and stop
  if (errors.length > 0) {
    alert("Please fix the following errors:\n\n- " + errors.join("\n- "));
    return;
  }

  // If all valid
  alert("✅ Success! All inputs are valid. Form submitted.");

  // Optional reset
  form.reset();

  // Clear messages + borders after reset
  [fullName, email, password, confirmPassword, age].forEach((input) => {
    input.style.border = "1px solid #000";
  });

  [fullNameMsg, emailMsg, passwordMsg, confirmPasswordMsg, ageMsg].forEach((msg) => {
    msg.textContent = "";
  });
});
