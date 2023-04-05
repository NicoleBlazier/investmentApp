// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
'use strict'; //tabs

var Form1Value = {};
var Sign = {};
var currentTab = 0; // Current tab is set to be the first tab (0)

showTab(currentTab); // Display the current tab
// all the buttons

var nextBtn = document.getElementById('nextBtn');
var prevBtn = document.getElementById('prevBtn'); //form 1

var shareInput = document.getElementById('share');
var numOfShares = document.getElementById('numOfShares');
var btnInvest = document.querySelectorAll('.btn-ownership');
var investment = document.getElementById('investment');
var equity = document.getElementById('equity');
var trust = document.getElementById('trust');
var ira = document.getElementById('ira/401k'); //form 2

var fullName = document.getElementById('full-name');
var selectDay = document.getElementById('select-day');
var selectMonth = document.getElementById('select-month');
var selectYear = document.getElementById('select-year');
var ssnRadio = document.getElementById('ssn');
var digitNumInput = document.getElementById('digit-number');
var withholdRadio = document.getElementById('withholding');
var dividRadio = document.getElementById('dividends');
var selectCitizenship = document.getElementById('citizenship');
var selectCountry = document.getElementById('select-country');
var dayPhone = document.getElementById('day-phone');
var eveningPhone = document.getElementById('evening-phone');
var addressOne = document.getElementById('address-line-1');
var city = document.getElementById('city');
var selectState = document.getElementById('select-state');
var zipcode = document.getElementById('zipcode'); // review form 3

var reviewShares = document.getElementById('review-shares');
var reviewOwnership = document.getElementById('review-ownership');
var reviewFullName = document.getElementById('review-full-name');
var reviewDOB = document.getElementById('review-dob');
var reviewSsn = document.getElementById('review-ssn');
var reviewCitizenship = document.getElementById('review-citizenship');
var reviewCountry = document.getElementById('review-country');
var reviewDayPhone = document.getElementById('review-day-phone');
var reviewEvenPhone = document.getElementById('review-even-phone');
var reviewAddressOne = document.getElementById('review-address-one');
var reviewAddressOneLineTwo = document.getElementById('review-address-one-line-two');
var reviewTaxId = document.getElementById('review-tax-id');
var reviewSsnRadio = document.getElementById('review-ssn-radio');
var reviewWithhold = document.getElementById('review-withholding');
var reviewDivid = document.getElementById('review-dividends');
var reviewAddressTitle = document.getElementById('address-line-2-title'); // Final Page and Submit

var fundNum = document.getElementById('fund-num');
var sigImageSum = document.getElementById('sig-image-sum');
shareInput.addEventListener('change', function () {
  numericValidation();
});
investment.addEventListener('click', function () {
  findActive(investment);
});
equity.addEventListener('click', function () {
  findActive(equity);
});
trust.addEventListener('click', function () {
  findActive(trust);
});
ira.addEventListener('click', function () {
  findActive(ira);
});
nextBtn.addEventListener('click', function () {
  nextPrev(1);
});
prevBtn.addEventListener('click', function () {
  nextPrev(-1);
});
withholdRadio.addEventListener('click', function () {
  if (withholdRadio.checked === true) {
    dividRadio.checked = false;
  }
});
dividRadio.addEventListener('click', function () {
  if (dividRadio.checked === true) {
    withholdRadio.checked = false;
  }
});
selectDay.addEventListener('change', function () {
  selectDay.style.color = '#4F167A';
});
selectMonth.addEventListener('change', function () {
  selectMonth.style.color = '#4F167A';
});
selectYear.addEventListener('change', function () {
  selectYear.style.color = '#4F167A';
});
selectCountry.addEventListener('change', function () {
  selectCountry.style.color = '#4F167A';
});
selectCitizenship.addEventListener('change', function () {
  selectCitizenship.style.color = '#4F167A';
});
selectState.addEventListener('change', function () {
  selectState.style.color = '#4F167A';
});

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
  var nextBtn = document.getElementById('nextBtn');
  var prevBtn = document.getElementById('prevBtn');
  var x = document.getElementsByClassName("tab"); // Display the current tab that is selected

  x[n].style.display = "block"; //... and fix the Previous/Next buttons:

  if (n == 0) {
    nextBtn.style.display = "inline";
    prevBtn.style.display = "none";
  } else if (n == 4) {
    prevBtn.style.display = "none";
    nextBtn.innerHTML = 'Submit';
  } else {
    nextBtn.style.display = "inline";
    prevBtn.style.display = "inline";
  } //... and run a function that will display the correct step indicator:


  fixStepIndicator(n);
}

function fixStepIndicator(n) {
  // This function removes the "active" and "finish" class of all steps...
  var x = document.getElementsByClassName("circle");
  var finishTab;

  if (n > 0) {
    finishTab = n - 1;
  }

  for (var i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
    x[i].className = x[i].className.replace(" finish", "");

    if (finishTab >= i) {
      x[i].className += " finish";
    }
  } //... and adds the "active" class on the current step:


  x[n].className += " active";
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab"); // Exit the function if any field in the current tab is invalid:

  if (currentTab == 0 && !valWelcomeForm()) {
    return false;
  } // if (currentTab == 1 && !valPersonInfoForm()) {return false}


  if (currentTab == 3 && Sign.signed == undefined && n === 1) {
    return false;
  }

  if (currentTab == 4) {
    document.getElementById("regForm").submit();
    return false;
  } // Hide the current tab:


  x[currentTab].style.display = "none"; // Increase or decrease the current tab by 1:

  currentTab = currentTab + n; // Otherwise, display the correct tab:

  showTab(currentTab); // Pass all the object values to passValue function:
}

function numericValidation() {
  var valid = true,
      num,
      numComma; // store the number alue into Form1Value Object and Validates the number of shares

  if (isNaN(shareInput.value) || shareInput.value === '') {
    shareInput.style.backgroundColor = "#ffdddd";
    numOfShares.innerHTML = ' Please add only a number value.';
  } else {
    shareInput.style.backgroundColor = "#fff";
    num = shareInput.value * 10;
    numComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numOfShares.innerHTML = " = $ ".concat(numComma, " of shares");
    Form1Value.num = numComma;
  }
}

function valWelcomeForm() {
  // This function deals with validation of the form fields
  var valid = true; // store the ownership value into Form1Value object

  for (var i = 0; i < btnInvest.length; i++) {
    var active = btnInvest[i].classList.value.includes('active');

    if (active) {
      var ownership = btnInvest[i].classList[1].charAt(0).toUpperCase() + btnInvest[i].classList[1].slice(1);
      Form1Value.ownership = ownership;
    }
  } // Store values in fundNum for the final page


  fundNum.innerHTML = "bought $".concat(Form1Value.num, " ").concat(Form1Value.ownership, " shares"); // sees if both fields of the form are valid

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
  } else if (!isNaN(zipcode.value)) {
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

  for (var i = 0; i < isValid.length; i++) {
    if (isValid[i] === false) {
      valid = false;
    }
  }

  saveFormValues();
  return valid; // return the valid status
}

function saveFormValues() {
  reviewShares.innerHTML = "$".concat(Form1Value.num);
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
} // digital signature
//


(function () {
  window.requestAnimFrame = function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimaitonFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();

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
  canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    hasSignature = true;
    console.log('Mouse down', hasSignature);
    lastPos = getMousePos(canvas, e);
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    drawing = false;
    hasSignature = true;
    console.log('Mouse Up', hasSignature);
  }, false);
  canvas.addEventListener("mousemove", function (e) {
    console.log('Mouse Move', hasSignature);
    mousePos = getMousePos(canvas, e);
  }, false); // Add touch event support for mobile

  canvas.addEventListener("touchmove", function (e) {
    hasSignature = false;
    var touch = e.touches[0];
    var me = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);
  canvas.addEventListener("touchstart", function (e) {
    hasSignature = true;
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var me = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);
  canvas.addEventListener("touchend", function (e) {
    hasSignature = false;
    var me = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(me);
  }, false);

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  } // Prevent scrolling when touching the canvas


  document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
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
  } // Set up the UI


  var sigText = document.getElementById("sig-dataUrl");
  var sigImage = document.getElementById("sig-image");
  var clearBtn = document.getElementById("sig-clearBtn");
  var submitBtn = document.getElementById("sig-submitBtn");
  var canvasErr = document.getElementById("sig-canvas-err");
  clearBtn.addEventListener("click", function (e) {
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

  submitBtn.addEventListener('click', function (e) {
    if (hasSignature === true) {
      Sign.signed = true;
      submitInfo();
    } else if (hasSignature === false) {
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
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58059" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map