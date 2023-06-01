const signup_btn=document.getElementById("signup-btn");
const first_name=document.getElementById("fname");
const last_name=document.getElementById("lname");
const email=document.getElementById("email");
const password=document.getElementById("password");
const confirm_password=document.getElementById("cpassword");
const error=document.getElementById("error");



let users=[];
let current_user={};

if(JSON.parse(localStorage.getItem("users"))){
    users=JSON.parse(localStorage.getItem("users"));
}


signup_btn.addEventListener("click",(event)=>{
    console.log("signup btn");
    event.preventDefault();

    if(first_name.value==="" || last_name.value==="" || email.value==="" || password.value==="" || confirm_password.value==="" ){
        error.innerText="All fields are mandatory!";
        return;
    }

    if(ValidateEmail(email) === false){
        error.innerText="Please Enter a valid Email!";
        return;
    }
    
    if(emailExists(email)){
        error.innerText="Email already regirtered please use a different email or login to your account";
        return;
    }

    if(password.value !== confirm_password.value){
        error.innerText="Password does not match!";
        return;
    }
    let tokenKey=generateToken();
    error.innerHTML="";
    let obj={
        name: first_name.value+" "+last_name.value,
        email: email.value,
        password: password.value,
        token: tokenKey,
    }
    current_user=new Object(obj);
    users.push(obj);
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("currentUser",JSON.stringify(current_user));
    localStorage.setItem("cart","[]");
    let a=document.createElement("a");
    a.href="../shop/index.html"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})

function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.value.match(validRegex)) {
      return true;
    }
    else {
      return false;
    }
}

function emailExists(email) {
    let isExists=false;
    users.forEach((element)=>{
        if(element.email === email.value)
            isExists=true;
    });
    return isExists;
}

function generateToken() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
  
    for (var i = 0; i < 16; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }
    return result;
}

console.log(current_user);
