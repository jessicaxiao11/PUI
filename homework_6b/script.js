// Show and hide website menu
function showMenu() {
  document.getElementById("overlay").style.left = "0";
}

function hideMenu() {
  document.getElementById("overlay").style.left = "-25%";
}

// Transition to first quiz question on home page
function showQ1() {
  document.getElementById("quizIntro").style.display = "none";
  document.getElementById("quizQ1").style.display = "block";
}

// Transition to second quiz question on home page
function showQ2() {
  document.getElementById("quizQ1").style.display = "none";
  document.getElementById("quizQ2").style.display = "block";
}

// Show and hide section menu on product browsing page
function showSideMenu() {
  document.getElementById("sectionMenuOverlay").style.left = "0";
}

function hideSideMenu() {
  document.getElementById("sectionMenuOverlay").style.left = "-25%";
}

/* Scroll to section on product browsing page after using the section menu
 * 
 * scrolling code from:
 * https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far
 */
function scrollToElement(id) {
  const yOffset = -40; 
  const element = document.getElementById(id);
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}



/* ------------------   Shopping Cart Functionality ------------------------ */

// Object for product added to cart
function Product(productSize, productColor) {
  this.name = "Furdinand Backpack";
  this.size = productSize;
  this.color = productColor;
  this.quantity = 1;
  this.price = "$95";
}

// Add item to cart in model
function addToCart() {
  // Increase number in cart
  var numInCart = sessionStorage.getItem('numInCart');
  sessionStorage.setItem('numInCart', parseInt(numInCart)+1);

  // Add item to cart array
  var cart = JSON.parse(sessionStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }
  var itemExists = false;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    if (item.size === selectedSize && item.color === selectedColor) {
      item.quantity += 1;
      cart[i] = item;
      itemExists = true;
    }
  }

  if (!itemExists) {
    var newItem = new Product(selectedSize, selectedColor);
    cart.push(newItem);
  }

  sessionStorage.setItem('cart', JSON.stringify(cart));

  // Update view
  updateCartNum();
}

// Update view of cart number
function updateCartNum() {
  var numInCart = sessionStorage.getItem('numInCart');
  if (numInCart === null) {
    sessionStorage.setItem('numInCart', 0);
    numInCart = 0;
  }

  const carts = document.getElementsByClassName("cartNum");
  for (var i = 0; i < carts.length; i++) {
    carts[i].innerHTML=numInCart;
  }
}

// Display cart items
function displayCart() {
  // remove all children
  var cartItems = document.getElementById("cartItems");

  // display all children
  var cart = JSON.parse(sessionStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }
  var totalItems = 0;
  for (var i = 0; i < cart.length; i++) {
    // create new item
    const item = document.createElement("div");
    item.style.backgroundColor = "blue";
    const topOffset = 50 + i*200;
    item.style.top = String(topOffset) + "px";
    item.style.position = "absolute";
    cartItems.style.height = String(topOffset + 200) + "px";
    document.getElementById("cartLine").style.height = String(topOffset + 200) + "px";
    cartItems.appendChild(item);

    // create img of item
    const img = document.createElement("img");
    img.className = "cartItemImage";
    img.src = "images/furdinandBackpack" + capitalize(cart[i].color) + ".png";
    img.alt = "image of furdinand backpack";
    item.appendChild(img);

    // create title, size, color, price, quantity
    const title = document.createElement("p");
    title.className = "cartItemTitle";
    title.innerHTML = "Furdinand Backpack";
    item.appendChild(title);

    const size = document.createElement("p");
    size.className = "cartItemSize";
    size.innerHTML = "Size: " + capitalize(cart[i].size);
    item.appendChild(size);

    const color = document.createElement("p");
    color.className = "cartItemColor";
    if (cart[i].color === "fireorange") {
      color.innerHTML = "Color: Fire Orange";
    } else {
      color.innerHTML = "Color: " + capitalize(cart[i].color);
    }
    item.appendChild(color);

    const price = document.createElement("p");
    price.className = "cartItemPrice";
    price.innerHTML = cart[i].price;
    item.appendChild(price);

    const quantity = document.createElement("p");
    quantity.className = "cartItemQuantity";
    quantity.innerHTML = cart[i].quantity;
    item.appendChild(quantity);
    totalItems += cart[i].quantity;
  }

  // Update pricing
  var subtotal = 95 * totalItems;
  var taxes = Math.round(subtotal * 0.11).toFixed(2);
  var total = subtotal + Number(taxes) + 5.99;

  document.getElementById("subtotalPrice").innerHTML = "$" + subtotal;
  document.getElementById("taxesPrice").innerHTML = "$" + taxes;
  document.getElementById("totalPrice").innerHTML = "$" + total;
}

// Display correct items in cart when window first loads
window.onload = function(){ 
  updateCartNum(); 
  if (window.location.href.indexOf('cart.html') > -1) {
    displayCart();
  }
}

var selectedSize = 'tiny';
var selectedColor = 'blackberry';

// Select size in product detail page, by greying out un-selected items
function selectSize(id) {
  var sizes = ['tiny', 'small', 'medium', 'large'];
  selectedSize = id;
  document.getElementById(id).style.opacity = "100%";
  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i] !== selectedSize) {
      document.getElementById(sizes[i]).style.opacity = "20%";
    }
  }
}

function capitalize(color) {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

/* Select color in product detail page, by greying out un-selected items
 * Color selection also determines whether the item is in low stock, and which 
 * product image is displayed */
function selectColor(id) {
  var colors = ['strawberry', 'blackberry', 'crazyberry', 'fireorange'];
  selectedColor = id;
  document.getElementById(id).style.opacity = "100%";
  // grey out unselected items
  for (var i = 0; i < colors.length; i++) {
    if (colors[i] !== selectedColor) {
      document.getElementById(colors[i]).style.opacity = "20%";
    }
  }

  // display low stock for the blackberry color
  if (selectedColor !== "blackberry") {
    document.getElementById("lowStock").style.visibility = "hidden";
  } else {
    document.getElementById("lowStock").style.visibility = "visible";
  }

  document.getElementById("mainProductImg").src = "images/furdinandBackpack" + capitalize(id) + ".png";
  for (var i = 0; i < colors.length; i++) {
    if (colors[i] == id) {
      document.getElementById("productImg" + capitalize(colors[i])).style.opacity = "100%";
    } else {
      document.getElementById("productImg" + capitalize(colors[i])).style.opacity = "20%";
    }
  }
}