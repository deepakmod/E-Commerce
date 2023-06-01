if(!JSON.parse(localStorage.getItem("currentUser"))){
    let a=document.createElement("a");
    a.href="../index.html"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

let cart=[];
cart=JSON.parse(localStorage.getItem("cart"));
let cartItems=document.getElementById("cart-items");
let checkoutList=document.getElementById("checkout-list");
let totalPrice=document.getElementById("total-price");
let checkoutBtn=document.getElementById("checkout-btn");

function createContainer(element,index){
    let container=document.createElement("div");
    container.className="item";
    let img=document.createElement("img");
    img.src=element.image;
    img.className="images";
    container.appendChild(img);
    let div=document.createElement('div');
    div.className="item-details";
    let title=document.createElement("div");
    title.innerText="Title : "+element.title;
    div.appendChild(title);
    let price=document.createElement("div");
    price.innerText="Price : $"+element.price;
    div.appendChild(price);
    container.appendChild(div);
    let button=document.createElement("button");
    button.innerText="Remove From Cart";
    button.addEventListener("click",()=>{
        cart.splice(index,1);
        localStorage.setItem("cart",JSON.stringify(cart));
        showCartItems();
        showDetails();
        calculateTotal();
    });
    container.appendChild(button);
    return container;
}

function createContainer2(element,num){
    let div=document.createElement('div');
    div.className="distance";
    let title=document.createElement("div");
    title.innerText=num+". "+element.title;
    div.appendChild(title);
    let price=document.createElement("div");
    price.innerText="$"+element.price;
    div.appendChild(price);
    return div;
}

function showCartItems(){
    cartItems.innerHTML="";
    cart.forEach((element,index) => {
        let obj=createContainer(element,index);
        cartItems.appendChild(obj);
    });
}

function showDetails(){
    checkoutList.innerHTML="";
    cart.forEach((element,index)=> {
        let obj=createContainer2(element,index+1);
        checkoutList.appendChild(obj);
    });
}

function calculateTotal(){
    totalPrice.innerHTML="";
    let total=0;
    cart.forEach((element)=>{
        total+=element.price;
    })
    let div=document.createElement('div');
    div.className="distance";
    let title=document.createElement("div");
    title.innerText="Total";
    div.appendChild(title);
    let price=document.createElement("div");
    price.innerText="$"+total;
    div.appendChild(price);
    totalPrice.appendChild(div);
}

checkoutBtn.addEventListener("click",()=>{
    console.log("checkout btn");
    if(cart.length !== 0){
        cart=[];
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("the items were purchased. ");
    }
    else{
        alert("Please add items in your cart");
    }
});

showCartItems();
showDetails();
calculateTotal();
console.log(cart);