function showMenu() {
  document.getElementById("overlay").style.left = "0";
}

function hideMenu() {
  document.getElementById("overlay").style.left = "-25%";
}

function showQ1() {
  document.getElementById("quizIntro").style.display = "none";
  document.getElementById("quizQ1").style.display = "block";
}

function showQ2() {
  document.getElementById("quizQ1").style.display = "none";
  document.getElementById("quizQ2").style.display = "block";
}

function showSideMenu() {
  document.getElementById("sectionMenuOverlay").style.left = "0";
}

function hideSideMenu() {
  document.getElementById("sectionMenuOverlay").style.left = "-25%";
}

/* scrolling code from:
 * https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far
 */
function scrollToElement(id) {
  const yOffset = -40; 
  const element = document.getElementById(id);
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

function addToCart() {
  var numInCart = sessionStorage.getItem('numInCart');
  sessionStorage.setItem('numInCart', parseInt(numInCart)+1);
  updateCart();
}

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

window.onload = function(){ 
  updateCart(); 
}

function selectSize(id) {
  var sizes = ['tiny', 'small', 'medium', 'large'];
  document.getElementById(id).style.opacity = "100%";
  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i] !== id) {
      document.getElementById(sizes[i]).style.opacity = "20%";
    }
  }
}

function selectColor(id) {
  var sizes = ['strawberry', 'blackberry', 'crazyberry', 'fireorange'];
  document.getElementById(id).style.opacity = "100%";
  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i] !== id) {
      document.getElementById(sizes[i]).style.opacity = "20%";
    }
  }
  if (id !== "blackberry") {
    document.getElementById("lowStock").style.visibility = "hidden";
  } else {
    document.getElementById("lowStock").style.visibility = "visible";
  }

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