const login_btn=document.getElementById("login-btn");
const email=document.getElementById("email");
const password=document.getElementById("password");
const error=document.getElementById("error");

let users=[];
let current_user={};

if(JSON.parse(localStorage.getItem("users"))){
    users=JSON.parse(localStorage.getItem("users"));
}


login_btn.addEventListener("click",(event)=>{
    console.log("login btn");
    event.preventDefault();
    if(emailExists() === false){
        error.innerText="Email Does not exists!";
        return;
    }

    if(passwordExists() === false){
        error.innerText="Wrong password , Try Again! ";
        return;
    }

    error.innerHTML="";
    users.forEach((element)=>{
        if(element.email === email.value)
            current_user=new Object(element);
    });
    localStorage.setItem("currentUser",JSON.stringify(current_user));
    localStorage.setItem("cart","[]");
    let a=document.createElement("a");
    a.href="../shop/index.html"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})

function emailExists() {
    let isExists=false;
    users.forEach((element)=>{
        if(element.email === email.value)
            isExists=true;
    });
    return isExists;
}

function passwordExists() {
    let isExists=false;
    users.forEach((element)=>{
        if(element.password === password.value)
            isExists=true;
    });
    return isExists;
}

console.log(current_user);