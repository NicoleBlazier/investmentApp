'use strict';


//tabs
var Form1Value = {};
var Form2Value = {};
var FormSignature = {};
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

// all the buttons
const nextBtnF1 = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

//form 1
const shareInput = document.getElementById('share');
const numOfShares = document.getElementById('numOfShares');
const btnInvest = document.querySelectorAll('.btn-invest');
const investment = document.getElementById('investment');
const equity = document.getElementById('equity');
const trust = document.getElementById('trust');
const ira = document.getElementById('ira/401k');

//form 2
const fullName = document.getElementById('full-name');
const selectDay = document.getElementById('select-day');
const selectMonth = document.getElementById('select-month');
const selectYear = document.getElementById('select-year');
const taxIdRadio = document.getElementById('tax-id');
const ssnRadio = document.getElementById('ssn');
const digitNumInput = document.getElementById('digit-number');
const withholdRadio = document.getElementById('withholding');
const dividRadio = document.getElementById('dividends');
const citizenship = document.getElementById('citizenship');
const selectCountry = document.getElementById('select-country');
const dayPhone = document.getElementById('day-phone');
const eveningPhone = document.getElementById('evening-phone');
const addressOne = document.getElementById('address-line-1');
const addressTwo = document.getElementById('address-line-2');
const city = document.getElementById('city');
const selectState = document.getElementById('select-state');
const zipcode = document.getElementById('zipcode');

// review form 3
const reviewFullName = document.getElementById('review-full-name');
const reviewDOB = document.getElementById('review-dob');
const reviewSsn = document.getElementById('review-ssn');
const reviewCitizenship = document.getElementById('review-citizenship');
const reviewCountry = document.getElementById('review-country');
const reviewDayPhone = document.getElementById('review-day-phone');
const reviewEvenPhone = document.getElementById('review-even-phone');
const reviewAddressOne = document.getElementById('review-address-one');
const reviewAddressTwo = document.getElementById('review-address-two');
const reviewAddressOneLineTwo = document.getElementById('review-address-one-line-two');
const reviewAddressTwoLineTwo = document.getElementById('review-address-two-line-two');
const fundNum = document.getElementById('fund-num');
const sigImageSum = document.getElementById('sig-image-sum');
const reviewTaxId = document.getElementById('review-tax-id');
const reviewSsnRadio = document.getElementById('review-ssn-radio');
const reviewWithhold = document.getElementById('review-withholding');
const reviewDivid = document.getElementById('review-dividends');
const reviewAddressTitle = document.getElementById('address-line-2-title');

// review on final page
const review = document.getElementById('review');

shareInput.addEventListener('change', () => {
  numericValidation(shareInput);
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
  // if (currentTab == ) {
  //   location.reload();
  // }
})

prevBtn.addEventListener('click', () => {
  nextPrev(-1)
})

taxIdRadio.addEventListener('click', () => {
    if (taxIdRadio.checked === true) {
      ssnRadio.checked = false;
      digitNumInput.style.display = 'none';
    }
})

ssnRadio.addEventListener('click', () => {
    if (ssnRadio.checked === true) {
      taxIdRadio.checked = false;
      digitNumInput.style.display = 'block';
    }
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

  // store the ownership value into Form1Value object
  for (var i=0; i < btnInvest.length; i++) {
    const active = btnInvest[i].classList.value.includes('active');
    if (active) {
      const ownership = btnInvest[i].classList[1]
      Form1Value.ownership = ownership;
    }
  }
}

function showTab(n) {
  console.log('n', n)
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").innerHTML = 'Next';
  } else if (n == 4) {
    document.getElementById("nextBtn").innerHTML = 'Submit';
  } else {
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").innerHTML = 'Next';
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (currentTab == 0 && !valWelcomeForm()) return false;
  if (currentTab == 1 && !valPersonInfoForm()) return false;
  if (currentTab == 3) {displaySignature()}

  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  // Pass all the object values to passValue function:
  passValues(currentTab);
}

function valWelcomeForm() {
  // This function deals with validation of the form fields
  var valid = true;
  // sees if both fields of the form are valid
  if (Form1Value.ownership === undefined) return valid = false;
  if (!numericValidation()) return valid = false;
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("circle")[currentTab].className += " finish";
  }

  return valid; // return the valid status
}

function valPersonInfoForm() {
  // This function deals with validation of the form fields
  var valid = true;
  // sees if both fields of the form are valid
  if (!validateDoubleAlpha()) return valid = false;
  if (!validateSelectOptions()) return valid = false;
  if (!validateInputAlpha()) return valid = false;
  if (!validateNumbers()) return valid = false;
  if (!validatePhoneNum()) return valid = false;
  if (!validateAlphaNum()) return valid = false;
  if (!grOneRadioChecked()) return valid = false;
  if (!grTwoRadioChecked()) return valid = false;
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("circle")[currentTab].className += " finish";
  }

  return valid; // return the valid status
}

function numericValidation() {
  // this function validates a numeric value in this field
  var z = shareInput, num, numComma, valid = false;

  if (isNaN(z.value) || z.value === '') {
    z.style.backgroundColor = "#ffdddd"
    numOfShares.innerHTML = 'Please add only a number value.';
  } else {
    z.style.backgroundColor = "#fff"
    num = z.value * 10;
    numComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numOfShares.innerHTML = `= $ ${numComma} of shares`;
    Form1Value.num = num;
    valid = true;
  }

  return valid; // return the valid status
}


function validateDoubleAlpha() {
  //this function validates if there are two alpha values in a field
  var inputAlpha = /^[a-zA-Z]+ [a-zA-Z]+$/, valid = false;

  if (!inputAlpha.test(fullName.value)) {
    fullName.style.backgroundColor = "#ffdddd"
  } else {
    fullName.style.backgroundColor = "#fff"
    valid = true;
    Form2Value.fullName = fullName.value;
  }

  return valid;
}

function validateSelectOptions() {
  var valid = false, i, select = [];
  select.push(selectDay, selectMonth, selectYear, selectCountry, selectState)

  for (i = 0; i < select.length; i++) {
    if (select[i].value == 0) {
      select[i].style.backgroundColor = "#ffdddd";
    } else {
      select[i].style.backgroundColor = "#fff";
      valid = true;
    }
  }

  Form2Value.date = selectDay.value;
  Form2Value.month = selectMonth.value;
  Form2Value.year = selectYear.value;
  Form2Value.country = selectCountry.value;
  Form2Value.state = selectState.value;
  return valid;
}



function validateInputAlpha() {
  var valid = false, i,  select = [];
  var inputAlpha = /^[a-zA-Z]+$/
  select.push(citizenship, city)

  for (i = 0; i < select.length; i++) {
    if (!inputAlpha.test(select.value)) {
      select[i].style.backgroundColor = "#ffdddd";
    } else {
      select[i].style.backgroundColor = "#fff";
      valid = true;
    }
  }

  Form2Value.citizenship = citizenship.value;
  Form2Value.city = city.value;
  return valid;

}

function validateNumbers() {
  var valid = false, i, select = [];
  select.push(zipcode, digitNumInput)

  for (i = 0; i < select.length; i++) {
    if (!isNaN(select.value)) {
      select[i].style.backgroundColor = "#ffdddd";
    } else {
      select[i].style.backgroundColor = "#fff";
      valid = true;
    }
  }

  zipcode.value.length == 5 ? zipcode.style.backgroundColor = "#fff" : zipcode.style.backgroundColor = "#ffdddd";
  digitNumInput.value.length == 9 ? digitNumInput.style.backgroundColor = "#fff" : digitNumInput.style.backgroundColor = "#ffdddd";

  if (isNaN(zipcode.value) || isNaN(digitNumInput.value) ||
    zipcode.value.length < 5 || digitNumInput.value.length < 9 ||
    zipcode.value.length > 5 || digitNumInput.value.length > 9 ||
    zipcode.value == '') {
      valid = false;
  } else {
      valid = true;
  }

  if (digitNumInput.value == '' && taxIdRadio.checked == true) {
    valid = true;
  }

  Form2Value.zipcode = zipcode.value;
  Form2Value.digitNumInput = digitNumInput.value;

  return valid;
}

function validatePhoneNum() {
  var valid = false, i, select = [];
  var phoneNum = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
  select.push(dayPhone, eveningPhone)

  for (i = 0; i < select.length; i++) {
    console.log(phoneNum.test(select.value))
    if (!phoneNum.test(select.value)) {
      select[i].style.backgroundColor = "#fff";
      valid = true;
    } else {
      select[i].style.backgroundColor = "#ffdddd";
    }
  }

  Form2Value.dayPhone = dayPhone.value;
  Form2Value.eveningPhone = eveningPhone.value;

  return valid;
}

function validateAlphaNum() {
  var valid = false, i, select = [];
  var addressText = /^[0-9a-zA-Z]+$/
  select.push(addressOne, addressTwo)

  for (i = 0; i < select.length; i++) {
    if (addressText.test(select.value)) {
      select[i].style.backgroundColor = "#fff";
    } else {
      select[i].style.backgroundColor = "#ffdddd";
    }
  }

  addressOne.value == '' ? addressOne.style.backgroundColor = "#ffdddd" : addressOne.style.backgroundColor = "#fff";
  addressTwo.value == '' ? addressTwo.style.backgroundColor = "#ffdddd" : addressTwo.style.backgroundColor = "#fff";

  if (addressText.test(addressOne.value) ||  addressOne.value.length > 0) {
    valid = true;
  } else {
    valid = false;
  }

  Form2Value.addressOne = addressOne.value;
  Form2Value.addressTwo = addressTwo.value;

  return valid;
}

function grOneRadioChecked() {
  var valid = false;

  if (taxIdRadio.checked == true || ssnRadio.checked == true) {
    valid = true;
  } else {
    valid = false;
  }

  Form2Value.taxIdRadio = taxIdRadio.checked;
  Form2Value.ssnRadio = ssnRadio.checked;
  return valid;
}

function grTwoRadioChecked() {
  var valid = false;

  if (withholdRadio.checked == true || dividRadio.checked == true) {
    valid = true;
  } else {
    valid = false;
  }

  Form2Value.withholdRadio = withholdRadio.checked;
  Form2Value.dividRadio = dividRadio.checked;
  return valid;
}


function passValues(currentTab) {
    const shareNums = Form1Value.num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const ownershipsCap = Form1Value.ownership.charAt(0).toUpperCase() + Form1Value.ownership.slice(1);


  if (currentTab === 2) {
      reviewFullName.innerHTML = Form2Value.fullName;
      reviewDOB.innerHTML = Form2Value.month + ' ' + Form2Value.date + ', ' + Form2Value.year;
      reviewSsn.value = Form2Value.digitNumInput;
      reviewCitizenship.innerHTML = Form2Value.citizenship;
      reviewCountry.innerHTML = Form2Value.country;
      reviewDayPhone.innerHTML = Form2Value.dayPhone;
      reviewEvenPhone.innerHTML = Form2Value.eveningPhone;
      reviewAddressOne.innerHTML = Form2Value.addressOne;
      reviewAddressTwo.innerHTML = Form2Value.addressTwo;
      reviewAddressOneLineTwo.innerHTML = Form2Value.city + ', ' + Form2Value.state + ' ' + Form2Value.zipcode;
      fundNum.innerHTML = `bought $${shareNums} ${ownershipsCap} shares`;

        // if there is not address line 2 then do not display the address
      if (Form2Value.addressTwo == '') {
        reviewSsn.style.display = "none";
      } else {
        reviewAddressTwoLineTwo.innerHTML = Form2Value.city + ', ' + Form2Value.state + ' ' + Form2Value.zipcode;
        reviewAddressTitle.style.display = "inline";
      }

      if (Form2Value.taxIdRadio === true) {
        reviewTaxId.checked = true
      } else {
        reviewSsnRadio.checked = true
      }

      if (Form2Value.withholdRadio === true) {
        reviewWithhold.checked = true
      } else {
        reviewDivid.checked = true
      }
  }
}


function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var x = document.getElementsByClassName("circle");
  for (var i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function displaySignature() {
  console.log(FormSignature.signature);

  const dataUrl = FormSignature.signature;
  sigImageSum.setAttribute("src", dataUrl);
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
  var mousePos = {
    x: 0,
    y: 0
  };
  var lastPos = mousePos;

  canvas.addEventListener("mousedown", function(e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
  }, false);

  canvas.addEventListener("mouseup", function(e) {
    drawing = false;
  }, false);

  canvas.addEventListener("mousemove", function(e) {
    mousePos = getMousePos(canvas, e);
  }, false);

  // Add touch event support for mobile
  canvas.addEventListener("touchstart", function(e) {

  }, false);

  canvas.addEventListener("touchmove", function(e) {
    var touch = e.touches[0];
    var me = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchstart", function(e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var me = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchend", function(e) {
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

  clearBtn.addEventListener("click", function(e) {
    console.log('clicked')
    clearCanvas();
    sigText.innerHTML = "Data URL for your signature will go here!";
    sigImage.setAttribute("src", "");
  }, false);

  submitBtn.addEventListener('click', function(e) {
      console.log('hello it was clicked')
      var dataUrl = canvas.toDataURL();
      sigText.style.display = 'inline';
      sigImage.style.display = 'inline';
      sigText.innerHTML = dataUrl;
      sigImage.setAttribute("src", dataUrl);
      FormSignature.signature = dataUrl;
  }, false);


})();
