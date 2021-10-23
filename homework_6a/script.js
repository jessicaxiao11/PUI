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

// Increase number of items in cart by one
function addToCart() {
  var numInCart = sessionStorage.getItem('numInCart');
  sessionStorage.setItem('numInCart', parseInt(numInCart)+1);
  updateCart();
}

// Update displayed number of items in cart
function updateCart() {
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

// Display correct number of items in cart when window first loads
window.onload = function(){ 
  updateCart(); 
}

// Select size in product detail page, by greying out un-selected items
function selectSize(id) {
  var sizes = ['tiny', 'small', 'medium', 'large'];
  document.getElementById(id).style.opacity = "100%";
  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i] !== id) {
      document.getElementById(sizes[i]).style.opacity = "20%";
    }
  }
}

/* Select color in product detail page, by greying out un-selected items
 * Color selection also determines whether the item is in low stock, and which 
 * product image is displayed */
function selectColor(id) {
  var sizes = ['strawberry', 'blackberry', 'crazyberry', 'fireorange'];
  document.getElementById(id).style.opacity = "100%";
  
  // grey out unselected items
  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i] !== id) {
      document.getElementById(sizes[i]).style.opacity = "20%";
    }
  }

  // display low stock for the blackberry color
  if (id !== "blackberry") {
    document.getElementById("lowStock").style.visibility = "hidden";
  } else {
    document.getElementById("lowStock").style.visibility = "visible";
  }

  // show correct product image that corresponds with the selected color
  var color = null;
  if (id == "blackberry") {
    color = 1;
  } else if (id == "strawberry") {
    color = 2 ;
  } else if (id == "crazyberry") {
    color = 3 ;
  } else {
    color = 4 ;
  }

  document.getElementById("mainProductImg").src = "images/furdinandBackpack" + color.toString() + ".png";
  for (var i = 1; i < 5; i++) {
    if (i == color) {
      document.getElementById("productImg" + i.toString()).style.opacity = "100%";
    } else {
      document.getElementById("productImg" + i.toString()).style.opacity = "20%";
    }
  }
}