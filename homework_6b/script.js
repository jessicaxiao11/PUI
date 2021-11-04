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
  this.size = productSize;
  this.color = productColor;
  this.quantity = 1;
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
  // remove all existing children to redraw
  var cartItems = document.getElementById("cartItems");
  // while (cartItems.firstChild) {
  //   cartItems.remove(cartItems.firstChild);
  // }

  // display all children
  var cart = JSON.parse(sessionStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }
  const template = document.getElementById('cart-item-template');
  var totalItems = 0;
  for (var i = 0; i < cart.length; i++) {
    // create new item
    const item = template.content.firstElementChild.cloneNode(true);
    item.id = cart[i].size + "_" + cart[i].color;

    // set position of item on page
    const topOffset = 50 + i*200;
    console.log(item);
    item.style.top = String(topOffset) + "px";
    item.style.position = "absolute";
    cartItems.style.height = String(topOffset + 200) + "px";
    document.getElementById("cartLine").style.height = String(topOffset + 200) + "px";
    cartItems.appendChild(item);

    // update img, size, color, quantity
    const img = item.querySelector('.cartItemImage');
    img.src = "images/furdinandBackpack" + capitalize(cart[i].color) + ".png";

    const size = item.querySelector('.cartItemSize');
    size.innerHTML = "Size: " + capitalize(cart[i].size);

    const color = item.querySelector('.cartItemColor');
    if (cart[i].color === "fireorange") {
      color.innerHTML = "Color: Fire Orange";
    } else {
      color.innerHTML = "Color: " + capitalize(cart[i].color);
    }

    const quantity = item.querySelector('.cartItemQuantity');
    quantity.innerHTML = cart[i].quantity;
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

// decrement item quantity in cart
function decrementQuantity() {
  const quantityElem = this;
  const itemID = quantityElem.parentElement.id;
  const splitID = itemID.split("_");
  const size = splitID[0];
  const color = splitID[1];

  // find item, decrement quantity and/or remove completely
  var cart = JSON.parse(sessionStorage.getItem('cart'));
  var itemIndex = -1;
  var remove = false;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    if (item.size === size && item.color === color) {
      item.quantity--;
      if (item.quantity === 0) {
        remove = true;
        itemIndex = i;
      } else {
        cart[i] = item;
      }
    }
  }

  if (remove) {
    cart.splice(itemIndex, 1);
  }

  sessionStorage.setItem('cart', JSON.stringify(cart));

  // re-draw cart
  displayCart();

}

// increase item quantity in cart
function incrementQuantity() {
  const quantityElem = this;
  const itemID = quantityElem.parentElement.id;
  const splitID = itemID.split("_");
  const size = splitID[0];
  const color = splitID[1];

  // find item, increment quantity
  var cart = JSON.parse(sessionStorage.getItem('cart'));
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    if (item.size === size && item.color === color) {
      item.quantity++;
      cart[i] = item;
    }
  }

  sessionStorage.setItem('cart', JSON.stringify(cart));

  // re-draw cart
  displayCart();

}

// remove item completely from cart
function removeItem() {
  const quantityElem = this;
  const itemID = quantityElem.parentElement.id;
  const splitID = itemID.split("_");
  const size = splitID[0];
  const color = splitID[1];

  // find item, remove completely
  var cart = JSON.parse(sessionStorage.getItem('cart'));
  var itemIndex = -1;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    if (item.size === size && item.color === color) {
      itemIndex = i;
    }
  }
  
  cart.splice(itemIndex, 1);

  sessionStorage.setItem('cart', JSON.stringify(cart));

  // re-draw cart
  displayCart();
}
