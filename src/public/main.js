'use strict';

//tabs
var Form1Value = {};
var Sign = {};
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

// all the buttons
var nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

//form 1
const shareInput = document.getElementById('share');
const numOfShares = document.getElementById('numOfShares');
const btnInvest = document.querySelectorAll('.btn-ownership');
const investment = document.getElementById('investment');
const equity = document.getElementById('equity');
const trust = document.getElementById('trust');
const ira = document.getElementById('ira/401k');

//form 2
const fullName = document.getElementById('full-name');
const selectDay = document.getElementById('select-day');
const selectMonth = document.getElementById('select-month');
const selectYear = document.getElementById('select-year');
const ssnRadio = document.getElementById('ssn');
const digitNumInput = document.getElementById('digit-number');
const withholdRadio = document.getElementById('withholding');
const dividRadio = document.getElementById('dividends');
const selectCitizenship = document.getElementById('citizenship');
const selectCountry = document.getElementById('select-country');
const dayPhone = document.getElementById('day-phone');
const eveningPhone = document.getElementById('evening-phone');
const addressOne = document.getElementById('address-line-1');
const city = document.getElementById('city');
const selectState = document.getElementById('select-state');
const zipcode = document.getElementById('zipcode');

// review form 3
const reviewShares = document.getElementById('review-shares');
const reviewOwnership = document.getElementById('review-ownership');
const reviewFullName = document.getElementById('review-full-name');
const reviewDOB = document.getElementById('review-dob');
const reviewSsn = document.getElementById('review-ssn');
const reviewCitizenship = document.getElementById('review-citizenship');
const reviewCountry = document.getElementById('review-country');
const reviewDayPhone = document.getElementById('review-day-phone');
const reviewEvenPhone = document.getElementById('review-even-phone');
const reviewAddressOne = document.getElementById('review-address-one');
const reviewAddressOneLineTwo = document.getElementById('review-address-one-line-two');
const reviewTaxId = document.getElementById('review-tax-id');
const reviewSsnRadio = document.getElementById('review-ssn-radio');
const reviewWithhold = document.getElementById('review-withholding');
const reviewDivid = document.getElementById('review-dividends');
const reviewAddressTitle = document.getElementById('address-line-2-title');

// Final Page and Submit
const fundNum = document.getElementById('fund-num');
const sigImageSum = document.getElementById('sig-image-sum');

shareInput.addEventListener('change', () => {
  numericValidation();
})

investment.addEventListener('click', () => {
  findActive(investment);
})

equity.addEventListener('click', () => {
  findActive(equity);
})

trust.addEventListener('click', () => {
  findActive(trust);
})

ira.addEventListener('click', () => {
  findActive(ira);
})

nextBtn.addEventListener('click', () => {
  nextPrev(1)
})

prevBtn.addEventListener('click', () => {
  nextPrev(-1)
})

withholdRadio.addEventListener('click', () => {
    if (withholdRadio.checked === true) {
      dividRadio.checked = false;
    }
})

dividRadio.addEventListener('click', () => {
    if (dividRadio.checked === true) {
      withholdRadio.checked = false;
    }
})

selectDay.addEventListener('change', () => {
  selectDay.style.color = '#4F167A';
})

selectMonth.addEventListener('change', () => {
  selectMonth.style.color = '#4F167A';
})

selectYear.addEventListener('change', () => {
  selectYear.style.color = '#4F167A';
})

selectCountry.addEventListener('change', () => {
  selectCountry.style.color = '#4F167A';
})

selectCitizenship.addEventListener('change', () => {
  selectCitizenship.style.color = '#4F167A';
})

selectState.addEventListener('change', () => {
  selectState.style.color = '#4F167A';
})

function findActive(btn) {
  // onclick button make it active and highlight button
  if (btn === investment) {
    investment.classList.add('active');
    equity.classList.remove('active');
    trust.classList.remove('active');
    ira.classList.remove('active');
  } else if (btn === equity) {
    investment.classList.remove('active');
    equity.classList.add('active');
    trust.classList.remove('active');
    ira.classList.remove('active');
  } else if (btn === trust) {
    investment.classList.remove('active');
    equity.classList.remove('active');
    trust.classList.add('active');
    ira.classList.remove('active');
  } else if (btn === ira) {
    investment.classList.remove('active');
    equity.classList.remove('active');
    trust.classList.remove('active');
    ira.classList.add('active');
  }
}

function showTab(n) {
  // This function will display the specified tab of the form...
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  var x = document.getElementsByClassName("tab");
  // Display the current tab that is selected
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    nextBtn.style.display = "inline";
    prevBtn.style.display = "none";
  } else if (n == 4) {
    prevBtn.style.display = "none";
    nextBtn.innerHTML = 'Submit';
  } else {
    nextBtn.style.display = "inline";
    prevBtn.style.display = "inline";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function fixStepIndicator(n) {
  // This function removes the "active" and "finish" class of all steps...
  var x = document.getElementsByClassName("circle");
  var finishTab;

  if (n > 0) {finishTab = n - 1;}
  for (var i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
    x[i].className = x[i].className.replace(" finish", "");
    if (finishTab >= i) {
      x[i].className += " finish";
    }
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (currentTab == 0 && !valWelcomeForm()) {return false;}
  // if (currentTab == 1 && !valPersonInfoForm()) {return false}
  if (currentTab == 3 && Sign.signed == undefined && n === 1) {return false}
  if (currentTab == 4) {
    document.getElementById("regForm").submit();
    return false
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // Otherwise, display the correct tab:
  showTab(currentTab);
  // Pass all the object values to passValue function:
}

function numericValidation() {
  var valid = true, num, numComma;
  // store the number alue into Form1Value Object and Validates the number of shares
  if (isNaN(shareInput.value) || shareInput.value === '') {
    shareInput.style.backgroundColor = "#ffdddd"
    numOfShares.innerHTML = ' Please add only a number value.';
  } else {
    shareInput.style.backgroundColor = "#fff"
    num = shareInput.value * 10;
    numComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numOfShares.innerHTML = ` = $ ${numComma} of shares`;
    Form1Value.num = numComma;
  }
}

function valWelcomeForm() {
  // This function deals with validation of the form fields
  var valid = true;
  // store the ownership value into Form1Value object
  for (var i=0; i < btnInvest.length; i++) {
    const active = btnInvest[i].classList.value.includes('active');
    if (active) {
      const ownership = btnInvest[i].classList[1].charAt(0).toUpperCase() + btnInvest[i].classList[1].slice(1);
      Form1Value.ownership = ownership;
    }
  }
  // Store values in fundNum for the final page
  fundNum.innerHTML = `bought $${Form1Value.num} ${Form1Value.ownership} shares`;
  // sees if both fields of the form are valid
  if (Form1Value.num === undefined) return valid = false;
  if (Form1Value.ownership === undefined) return valid = false;

  return valid; // return the valid status
}

function valPersonInfoForm() {
  // This function deals with validation of the form fields
  var valid = true;
  var inputAlphaDble = /^[a-zA-Z]+ [a-zA-Z]+$/;
  var inputAlphaSgle = /^[a-zA-Z]+$/;
  var phoneNum = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
  var addressText = /^[0-9a-zA-Z]+ [0-9a-zA-Z]+$/;
  var number = /^[0-9]+$/;
  var isValid = [];

  if (!inputAlphaDble.test(fullName.value)) {
    fullName.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  } else {
    fullName.style.backgroundColor = "#fff";
    isValid.push(true);
  }

  if (selectDay.value > 0) {
    selectDay.style.backgroundColor = "#fff";
    isValid.push(true);
  } else {
    selectDay.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (selectMonth.value != 0) {
    selectMonth.style.backgroundColor = "#fff";
    isValid.push(true);
  } else {
    selectMonth.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (selectYear.value > 0) {
    selectYear.style.backgroundColor = "#fff";
    isValid.push(true);
  } else {
    selectYear.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (selectCountry.value != 0) {
    selectCountry.style.backgroundColor = "#fff";
    isValid.push(true);
  } else {
    selectCountry.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (selectState.value != 0) {
    selectState.style.backgroundColor = "#fff";
    isValid.push(true);
  } else {
    selectState.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (selectCitizenship.value != 0) {
    selectCitizenship.style.backgroundColor = "#fff";
    isValid.push(true);
  } else {
    selectCitizenship.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (!inputAlphaSgle.test(city.value)) {
    city.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  } else {
    city.style.backgroundColor = "#fff";
    isValid.push(true);
  }

  if (phoneNum.test(dayPhone.value)) {
    dayPhone.style.backgroundColor = "#fff";
    isValid.push(true);
  } else {
    dayPhone.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (phoneNum.test(eveningPhone.value)) {
    eveningPhone.style.backgroundColor = "#fff";
    isValid.push(true);
  } else {
    eveningPhone.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (addressText.test(addressOne.value)) {
    addressOne.style.backgroundColor = "#fff";
    isValid.push(true);
  } else if (addressOne.value == '') {
    addressOne.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  } else {
    addressOne.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (zipcode.value.length == 5) {
    zipcode.style.backgroundColor = "#fff";
    isValid.push(true);
  } else if (!isNaN(zipcode.value)){
    zipcode.style.backgroundColor = "#ffdddd";
    isValid.push(false);
  }

  if (isNaN(digitNumInput.value) || digitNumInput.value.value === '') {
    isValid.push(false);
    digitNumInput.style.backgroundColor = "#ffdddd";
  } else {
    if (digitNumInput.value.length < 9 || digitNumInput.value.length > 9) {
      digitNumInput.style.backgroundColor = "#ffdddd";
      isValid.push(false);
    } else {
      digitNumInput.style.backgroundColor = "#fff";
      isValid.push(true);
    }
  }

  if (withholdRadio.checked == true || dividRadio.checked == true) {
    isValid.push(true);
  } else {
    isValid.push(false);
  }

  for (var i=0; i < isValid.length; i++) {
    if (isValid[i] === false) {
      valid = false;
    }
  }

  saveFormValues()
  return valid; // return the valid status
}

function saveFormValues() {
  reviewShares.innerHTML = `$${Form1Value.num}`;
  reviewOwnership.innerHTML = Form1Value.ownership;
  reviewFullName.innerHTML = fullName.value;
  reviewDOB.innerHTML = selectMonth.value + ' ' + selectDay.value + ', ' + selectYear.value;
  reviewCountry.innerHTML = selectCountry.value;
  reviewAddressOneLineTwo.innerHTML = city.value + ', ' + selectState.value + ' ' + zipcode.value;
  reviewCitizenship.innerHTML = selectCitizenship.value;
  reviewDayPhone.innerHTML = dayPhone.value;
  reviewEvenPhone.innerHTML = eveningPhone.value;
  reviewAddressOne.innerHTML = addressOne.value;
  reviewSsn.value = digitNumInput.value;
  reviewWithhold.checked = withholdRadio.checked;
  reviewDivid.checked = dividRadio.checked;
}

// digital signature
//
(function() {
  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var canvas = document.getElementById("sig-canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 4;

  var drawing = false;
  var hasSignature = false;
  var mousePos = {
    x: 0,
    y: 0
  };
  var lastPos = mousePos;

  canvas.addEventListener("mousedown", function(e) {
    drawing = true;
    hasSignature = true;
    console.log('Mouse down', hasSignature)
    lastPos = getMousePos(canvas, e);
  }, false);

  canvas.addEventListener("mouseup", function(e) {
    drawing = false;
    hasSignature = true;
    console.log('Mouse Up', hasSignature)
  }, false);

  canvas.addEventListener("mousemove", function(e) {
    console.log('Mouse Move', hasSignature)
    mousePos = getMousePos(canvas, e);
  }, false);

  // Add touch event support for mobile
  canvas.addEventListener("touchmove", function(e) {
    hasSignature = false;
    var touch = e.touches[0];
    var me = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchstart", function(e) {
    hasSignature = true;
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var me = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchend", function(e) {
    hasSignature = false;
    var me = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(me);
  }, false);

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    }
  }

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    }
  }

  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  document.body.addEventListener("touchend", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  document.body.addEventListener("touchmove", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  (function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();

  function clearCanvas() {
    canvas.width = canvas.width;
  }

  // Set up the UI
  var sigText = document.getElementById("sig-dataUrl");
  var sigImage = document.getElementById("sig-image");
  var clearBtn = document.getElementById("sig-clearBtn");
  var submitBtn = document.getElementById("sig-submitBtn");
  var canvasErr = document.getElementById("sig-canvas-err");


  clearBtn.addEventListener("click", function(e) {
    clearCanvas();
    var dataUrl = canvas.toDataURL();
    hasSignature = false;
    canvasErr.innerHTML = 'Signature has been cleared';
    sigText.innerHTML = '';
    sigText.style.display = 'none';
    clearSigImage();
  }, false);

  function clearSigImage() {
    sigImageSum.removeAttribute('src');
    sigImageSum.style.display = 'none';
    sigImage.removeAttribute('src');
    sigImage.style.display = 'none';
  }

  submitBtn.addEventListener('click', function(e) {
    if (hasSignature === true) {
      Sign.signed = true;
      submitInfo();
    } else if (hasSignature === false){
      e.preventDefault();
      canvasErr.innerHTML = 'Please Enter Your Signature Above';
    }
  }, false);

  function submitInfo() {
    var dataUrl = canvas.toDataURL();
    canvasErr.innerHTML = '';
    sigText.style.display = 'inline';
    sigImage.style.display = 'inline';
    sigText.innerHTML = dataUrl;
    sigImage.setAttribute("src", dataUrl);
    sigImageSum.setAttribute("src", dataUrl);
    sigImageSum.style.display = 'block';
  }

})();
