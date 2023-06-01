const login_btn=document.getElementById("login");
const signup_btn=document.getElementById("signup");


signup_btn.addEventListener("click",(event)=>{
    console.log("signup btn");
    event.preventDefault();
    let a=document.createElement("a");
    a.href="./signup/index.html"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

login_btn.addEventListener("click",(event)=>{
    console.log("login btn");
    event.preventDefault();
    let a=document.createElement("a");
    a.href="./login/index.html"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
