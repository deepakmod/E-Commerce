window.onload=async function (){

  if(!JSON.parse(localStorage.getItem("currentUser"))){
    let a=document.createElement("a");
    a.href="../index.html"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  try{
    let response=await fetch("https://fakestoreapi.com/products");
    data=await response.json();
    data.forEach((element)=>{
      element.colors=generateColors();
      element.sizes=generateSizes();
    });
    localStorage.setItem("shopData",JSON.stringify(data));
  }
  catch(error){
    console.log("Something Went Wrong "+error);
  }

  let container=document.getElementById("container");
  let mensContainer=document.getElementById("mens-container");
  let womensContainer=document.getElementById("womens-container");
  let jewelleryContainer=document.getElementById("jwellery-container");
  let electronicsContainer=document.getElementById("electronics-container");
  
  let all_btn=document.getElementById("all-btn");
  let mens_btn=document.getElementById("mens-btn");
  let womens_btn=document.getElementById("womens-btn");
  let jewellery_btn=document.getElementById("jewellery-btn");
  let electronics_btn=document.getElementById("electronics-btn");
  let search=document.getElementById("search");
  let range=document.getElementById("range");
  let notFound=document.getElementById("not-found");

  let s1=document.getElementById("s1");
  let s2=document.getElementById("s2");
  let s3=document.getElementById("s3");
  let s4=document.getElementById("s4");
  let s5=document.getElementById("s5");

  let currentData=[...data];
  let current=[...data];
  let cart=[];
  function createContainer(element){
      let container=document.createElement("div");
      container.className="item";
      let img=document.createElement("img");
      img.id="images";
      img.src=element.image;
      container.appendChild(img);
      let info=document.createElement("div");
      info.className="info";
      let one=document.createElement("div");
      one.className="row";
      let price=document.createElement("div");
      price.innerText="$ "+element.price;
      one.appendChild(price);
      let sized=document.createElement("div");
      sized.innerText= `${element.sizes[0].toUpperCase()},${element.sizes[1].toUpperCase()},${element.sizes[2].toUpperCase()}`;
      one.appendChild(sized);
      info.appendChild(one);
      let colors=document.createElement("div");
      let arr=generateColors();
      colors.className="colors";
      colors.innerText="Colors:";
      let two=document.createElement("div");
      two.className="row";
      let c1=document.createElement("div");
      c1.className="circle";
      c1.style.backgroundColor=element.colors[0];
      two.appendChild(c1);
      let c2=document.createElement("div");
      c2.className="circle";
      c2.style.backgroundColor=element.colors[1];
      two.appendChild(c2);
      let c3=document.createElement("div");
      c3.className="circle";
      c3.style.backgroundColor=element.colors[2];
      two.appendChild(c3);
      colors.appendChild(two);
      info.appendChild(colors);
      let rating=document.createElement("div");
      rating.innerText=element.rating.rate;
      info.appendChild(rating);
      container.appendChild(info);
      let button=document.createElement("button");
      button.innerText="Add to Cart";
      button.id="addBtn";
      button.addEventListener("click",()=>{
        cart.push(element);
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("Product Added to cart");
      })
      container.appendChild(button);
      return container;
  }
  
  function generateColors(){
    let numbers=[];
    let colors=['red','green','blue','black','white'];
    while (numbers.length < 3) {
      var randomNumber = Math.floor(Math.random() * 5);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return [colors[numbers[0]],colors[numbers[1]],colors[numbers[2]]];
  }
  
  function generateSizes(){
    let numbers=[];
    let sizes=['s','m','l','xl'];
    while (numbers.length < 3) {
      var randomNumber = Math.floor(Math.random() * 4);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return [sizes[numbers[0]],sizes[numbers[1]],sizes[numbers[2]]];
  }


  function dispalyAll(){
    notFound.style.display="none";
    uncheckAll();
    s1.style.display="block";
    s2.style.display="none";
    s3.style.display="none";
    s4.style.display="none";
    s5.style.display="none";
    container.innerHTML="";
    currentData=[...data];
    data.forEach((element)=>{
        let temp=createContainer(element);
        container.appendChild(temp);
    })

    
  }

  function dispalyMens(){
    notFound.style.display="none";
    uncheckAll();
    s1.style.display="none";
    s2.style.display="block";
    s3.style.display="none";
    s4.style.display="none";
    s5.style.display="none";
    mensContainer.innerHTML="";
    currentData=[];
    data.forEach((element)=>{
      if(element.category === "men's clothing"){
        let temp=createContainer(element);
        mensContainer.appendChild(temp);
        currentData.push(element);
      }
    })
  }
  
  function dispalyWomens(){
    notFound.style.display="none";
    uncheckAll();
    s1.style.display="none";
    s2.style.display="none";
    s3.style.display="block";
    s4.style.display="none";
    s5.style.display="none";
    womensContainer.innerHTML="";
    currentData=[];
    data.forEach((element)=>{
      if(element.category === "women's clothing"){
        let temp=createContainer(element);
        womensContainer.appendChild(temp);
        currentData.push(element);
      }
    })
  }

  function dispalyJewellery(){
    notFound.style.display="none";
    uncheckAll();
    s1.style.display="none";
    s2.style.display="none";
    s3.style.display="none";
    s4.style.display="block";
    s5.style.display="none";
    jewelleryContainer.innerHTML="";
    currentData=[];
    data.forEach((element)=>{
      if(element.category === "jewelery"){
        let temp=createContainer(element);
        jewelleryContainer.appendChild(temp);
        currentData.push(element);
      }
    })
  }

  function dispalyElectronics(){
    notFound.style.display="none";
    uncheckAll();
    s1.style.display="none";
    s2.style.display="none";
    s3.style.display="none";
    s4.style.display="none";
    s5.style.display="block";
    electronicsContainer.innerHTML="";
    currentData=[];
    data.forEach((element)=>{
      if(element.category === "electronics"){
        let temp=createContainer(element);
        electronicsContainer.appendChild(temp);
        currentData.push(element);
      }
    })
  }

  search.addEventListener("keyup",(event)=>{
    console.log("search input");
    notFound.style.display="none";
    uncheckAll();
    let str=event.target.value.toLowerCase();
    s1.style.display="block";
    s2.style.display="none";
    s3.style.display="none";
    s4.style.display="none";
    s5.style.display="none";
    container.innerHTML="";
    currentData=[];
    data.forEach((element)=>{
      if(element.title.toLowerCase().includes(str)){
        let temp=createContainer(element);
        container.appendChild(temp);
        currentData.push(element);
      }
    })

    if(currentData.length == 0){
      notFound.style.display="block";
    }
  })


  const checkboxes = document.getElementsByName("color");
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        searchByColor(this);
      });
    });

    function uncheckAll() {
      checkboxes.forEach((element)=>{
        element.checked = false;
      });
      sizesCheckboxes.forEach((element)=>{
        element.checked = false;
      });
      priceRange.forEach((element)=>{
        element.checked = false;
      });
      range.value='0';
    } 


    function searchByColor(input){
      
      notFound.style.display="none";
      str=input.value;
      console.log(str + " color checkbox");
      if(input.checked === false){
        dispalyAll();
        return;
      }
      s1.style.display="block";
      s2.style.display="none";
      s3.style.display="none";
      s4.style.display="none";
      s5.style.display="none";
      container.innerHTML="";
      current=[...currentData];
      currentData=[];
      current.forEach((element)=>{
        if(element.colors.includes(str)){
          let temp=createContainer(element);
          container.appendChild(temp);
          currentData.push(element);
        }
      });

      if(currentData.length == 0){
        notFound.style.display="block";
      }
    }


    const sizesCheckboxes = document.getElementsByName("size");
    sizesCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        searchBySize(this);
      });
    });


    function searchBySize(input){
      notFound.style.display="none";
      str=input.value;
      console.log(str + " size checkbox");
      if(input.checked === false){
        dispalyAll();
        return;
      }
      s1.style.display="block";
      s2.style.display="none";
      s3.style.display="none";
      s4.style.display="none";
      s5.style.display="none";
      container.innerHTML="";
      current=[...currentData];
      currentData=[];
      current.forEach((element)=>{
        if(element.sizes.includes(str)){
          let temp=createContainer(element);
          container.appendChild(temp);
          currentData.push(element);
        }
      });

      if(currentData.length == 0){
        notFound.style.display="block";
      }
    }

    const priceRange = document.getElementsByName("prange");
    priceRange.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        searchByPriceRange(this);
      });
    });


    function searchByPriceRange(input){
      notFound.style.display="none";
      str=input.value.split("-");
      console.log(str + " range checkbox");
      if(input.checked === false){
        dispalyAll();
        return;
      }
      s1.style.display="block";
      s2.style.display="none";
      s3.style.display="none";
      s4.style.display="none";
      s5.style.display="none";
      container.innerHTML="";
      current=[...currentData];
      currentData=[];
      current.forEach((element)=>{
        if((element.price >= str[0])&&(element.price <= str[1])){
          console.log(parseInt(element.price),parseInt(str));
          let temp=createContainer(element);
          container.appendChild(temp);
          currentData.push(element);
        }
      });

      if(currentData.length == 0){
        notFound.style.display="block";
      }
    }

    
    range.addEventListener('change',(event)=>{
      searchByRating(event.target);
    })

    function searchByRating(input){
      notFound.style.display="none";
      str=input.value;
      console.log(str + " rating");
      if(str == '0'){
        dispalyAll();
        return;
      }
      s1.style.display="block";
      s2.style.display="none";
      s3.style.display="none";
      s4.style.display="none";
      s5.style.display="none";
      container.innerHTML="";
      current=[...currentData];
      currentData=[];
      current.forEach((element)=>{
        if(Math.floor(element.rating.rate) === Math.floor(str)){
          let temp=createContainer(element);
          container.appendChild(temp);
          currentData.push(element);
        }
      });

      if(currentData.length == 0){
        notFound.style.display="block";
      }
    }


  dispalyAll();
  all_btn.addEventListener("click",dispalyAll);
  mens_btn.addEventListener("click",dispalyMens);
  womens_btn.addEventListener("click",dispalyWomens);
  jewellery_btn.addEventListener("click",dispalyJewellery);
  electronics_btn.addEventListener("click",dispalyElectronics);
  console.log(data);
}