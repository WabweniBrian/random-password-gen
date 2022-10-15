// FUNCTION:: Get elements by id
const el = (elm) => document.getElementById(elm);
// FUNCTION:: Get elements by queryselector
const qs = (elm) => document.querySelector(elm);
// FUNCTION:: Get elements by queryselectorAll
const qsa = (elm) => document.querySelectorAll(elm);

// Get all DOM elements
const [
  passwordContainer,
  copyBtn,
  generateBtn,
  passLengthInput,
  uppercaseInput,
  lowerCaseInput,
  numbersInput,
  symbolsInput,
  msgContainer,
] = [
  el("randPass"),
  el("copyBtn"),
  el("generateBtn"),
  el("passLen"),
  el("upperCase"),
  el("lowerCase"),
  el("numbers"),
  el("symbols"),
  el("msg"),
];

let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "1234567890";
let symbols = "~!@#$%^&*()_+=:'';,.?|?<>-";

generateBtn.addEventListener("click", generateRandomPassword);

const getUpperCase = () =>
  uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
const getLowerCase = () =>
  lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
const getNumbers = () => numbers[Math.floor(Math.random() * numbers.length)];
const getSymbols = () => symbols[Math.floor(Math.random() * symbols.length)];

function generateRandomPassword() {
  let passwordLength = passLengthInput.value;
  if (passwordLength < 6) {
    qs(".error").innerText = "Password length must be above 6 characters";
    return;
  } else if (passwordLength > 30) {
    qs(".error").innerText = "Password length must not exceed 30 characters";
    return;
  } else {
    qs(".error").innerText = "";
  }
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    password += getPassword();
  }
  passwordContainer.innerText = password;
}

function getPassword() {
  let passwordArray = [];
  var randPassword;
  if (uppercaseInput.checked) passwordArray.push(getUpperCase());
  if (lowerCaseInput.checked) passwordArray.push(getLowerCase());
  if (numbersInput.checked) passwordArray.push(getNumbers());
  if (symbolsInput.checked) passwordArray.push(getSymbols());
  if (
    !uppercaseInput.checked &&
    !lowerCaseInput.checked &&
    !numbersInput.checked &&
    !symbolsInput.checked
  ) {
    msgContainer.classList.add("active");
    msgContainer.innerHTML = `<div class=" pt-1 pb-1 danger-color danger-bg-soft border-left-3 border-danger flex-align-center">
  <i class='feather-alert-circle ml-2 mr-1 text-16'></i>
  <span>Please select some fields!</span></div>`;
    randPassword = [];
  } else {
    msgContainer.innerText = "";
    msgContainer.classList.remove("active");
  }

  setTimeout(() => {
    msgContainer.classList.remove("active");
  }, 3000);

  if (passwordArray.length === 0) return "";

  randPassword =
    passwordArray[Math.floor(Math.random() * passwordArray.length)];

  return randPassword;
}

copyBtn.addEventListener("click", () => {
  let textarea = document.createElement("textarea");
  textarea.innerText = passwordContainer.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  if (passwordContainer.textContent) showToast();
});

function showToast() {
  msgContainer.classList.add("active");
  msgContainer.innerHTML = `<div class=" pt-1 pb-1 success-color success-bg-soft border-left-3 border-success flex-align-center">
  <i class='feather-check-circle ml-2 mr-1 text-16'></i>
  <span>Password Copied!</span></div>`;
  setTimeout(() => {
    msgContainer.classList.remove("active");
  }, 3000);
}
