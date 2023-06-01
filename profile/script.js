const saveBtn=document.getElementById("save-btn");
const changePasswordBtn=document.getElementById("change-password-btn");
const first_name=document.getElementById("fname");
const last_name=document.getElementById("lname");
const oldPassword=document.getElementById("opassword");
const password=document.getElementById("password");
const confirmPassword=document.getElementById("cpassword");
const error=document.getElementById("error");
const error2=document.getElementById("error2");
const logoutBtn=document.getElementById("logout-btn");

let users=[];
users=JSON.parse(localStorage.getItem("users"));
let current_user={};
if(JSON.parse(localStorage.getItem("currentUser"))){
    current_user=JSON.parse(localStorage.getItem("currentUser"));
}
else{
    let a=document.createElement("a");
    a.href="../index.html"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
let names=current_user.name.split(" ");
first_name.value=names[0];
last_name.value=names[names.length-1];


saveBtn.addEventListener("click",(event)=>{
    console.log("save info btn");
    event.preventDefault();
    if(first_name.value==="" || last_name.value===""){
        error.innerText="All fields are mandatory!";
        return;
    }
    error.innerText="";
    current_user.name=first_name.value+" "+last_name.value;
    localStorage.setItem("currentUser",JSON.stringify(current_user));
    current_user=JSON.parse(localStorage.getItem("currentUser"));
    users.forEach((element,i)=>{
        if(element.email === current_user.email){
            users[i].name=first_name.value+" "+last_name.value;
        }
    });
    localStorage.setItem("users",JSON.stringify(users));
    first_name.value="";
    last_name.value="";
})

changePasswordBtn.addEventListener("click",(event)=>{
    console.log("change password btn");
    event.preventDefault();
    if(password.value==="" || oldPassword.value==="" || confirmPassword===""){
        error2.innerText="All fields are mandatory!";
        return;
    }
    if(oldPassword.value !== current_user.password){
        error2.innerText="Wrong Password, Try again !";
        return;
    }
    if(password.value !== confirmPassword.value){
        error2.innerText="Password does not match!";
        return;
    }
    error2.innerText="";
    current_user.password=password.value;
    localStorage.setItem("currentUser",JSON.stringify(current_user));
    current_user=JSON.parse(localStorage.getItem("currentUser"));

    users.forEach((element,i)=>{
        if(element.email === current_user.email){
            users[i].password=current_user.password;
        }
    });
    localStorage.setItem("users",JSON.stringify(users));

    password.value="";
    confirmPassword.value="";
    oldPassword.value="";
})

logoutBtn.addEventListener("click",(event)=>{
    console.log("logout btn");
    event.preventDefault();
    localStorage.removeItem("currentUser");
    let a=document.createElement("a");
    a.href="../index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})