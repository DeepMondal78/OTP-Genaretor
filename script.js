const pwShow = document.querySelector(".show"),
create = document.querySelector("#create"),
conform = document.querySelector("#conform"),
alertIcon = document.querySelector(".icon"),
alertText = document.querySelector(".text"),
submitBtn = document.querySelector("#button")

pwShow.addEventListener("click", ()=>{
  if((create.type === "password") && (conform.type === "password")){
    create.type = "text";
    conform.type = "text";
    pwShow.classList.replace("fa-eye-slash", "fa-eye");
  }else {
    create.type = "password";
    conform.type = "password";
    pwShow.classList.replace("fa-eye", "fa-eye-slash");
  }    
});

create.addEventListener("input", ()=>{
   let inputValue = create.value.trim();
   if(inputValue.length >= 8){
    conform.removeAttribute("disabled");
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.add("active");

   }else {
    conform.setAttribute("disabled" , true);
    submitBtn.setAttribute("disabled" , true);
    submitBtn.classList.add("active");
    conform.value = "";
    alertText.innerText = "Enter at least 8 characters";
    alertText.style.color = "#a6a6a6";
    alertIcon.style.display = "none";
   }
});

submitBtn.addEventListener("click", ()=>{
    if(create.value === conform.value){
        alertText.innerText = "password matched";
        alertIcon.style.display = "none";
        alertText.style.color = "#4070f4";
    }else {
        alertText.innerText = "password didn't matched";
        alertText.style.color = "#d93025";
        alertIcon.style.display = "block";
    }
});

// Function to generate OTP

function generateOTP(length) {
  let otp = '';
  const characters = '0123456789';
  for (let i = 0; i < length; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

let otpGen;
let timer;
let secondsRemaining = 10;

function OTPFn() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    clearFn();
    otpGen = Math.floor(1000 + Math.random() * 9000);
    const temp = document.getElementById('content');
    const showOtp = document.createElement('div');
    showOtp.classList.add('otp-display');
    showOtp.innerHTML = `
        <p class="otp-text">Generated OTP: 
            <span>${otpGen}</span>
        </p>`;
    temp.appendChild(showOtp);
    document.getElementById('otpForm').style.display = 'flex';
    startTimer();
}

function clearFn() {
    const prevOtp = document.querySelector('.otp-display');
    if (prevOtp) {
        prevOtp.remove();
    }
    resetTimer();
    document.getElementById('errorMessage').innerText = '';
    enableInputField();
}

function OTPVerifyFn() {
    const userOtp = document.getElementById('userOTP').value;
    if (userOtp === "") {
        alert("Please enter OTP.");
        return;
    }
    const enterOtp = parseInt(userOtp);
    if (!isNaN(enterOtp)) {
        if (secondsRemaining > 0) {
            if (enterOtp === otpGen) {
                showMsgFn();
                document.getElementById('generateBtn').disabled = false;
                resetTimer();
                enableInputField();
            } else {
                document.getElementById('errorMessage').innerText = 'Invalid OTP. Please try again.';
            }
        } else {
            document.getElementById('errorMessage').innerText = 'OTP Expired. Please generate a new OTP.';
            resetTimer();
        }
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

function showMsgFn() {
    const successMessage = document.getElementById('successMessage');
    let otpCheck = document.getElementById('otp-check');
    successMessage.style.animation = 'fadeIn 1s forwards';
    successMessage.style.display = 'flex';
    otpCheck.innerHTML = 'Congratulations! OTP is Verified!';
    setTimeout(() => {
        otpCheck.innerHTML = ''
        successMessage.style.display = 'none';
    }, 2000);
}

function startTimer() {
    timer = setInterval(function () {
        if (secondsRemaining <= 0) {
            clearInterval(timer);
            document.getElementById('generateBtn').disabled = false;
            document.getElementById('errorMessage').innerText = 'OTP Expired. Please generate a new OTP.';
            resetTimer();
            disableInputField();
        } else {
            document.getElementById('timer').innerText = `Time Remaining: ${secondsRemaining} seconds`;
            secondsRemaining--;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer').innerText = '';
    secondsRemaining = 20;
}

function disableInputField() {
    document.getElementById('userOTP').disabled = true;
}

function enableInputField() {
    document.getElementById('userOTP').disabled = false;
}

function clearFields() {
    document.getElementById('userOTP').value = '200';
    clearFn();
}

