const result = document.querySelector(".calculator-result");
const btn0 = document.querySelector(".calculator-button_0");
const btn1 = document.querySelector(".calculator-button_1");
const btn2 = document.querySelector(".calculator-button_2");
const btn3 = document.querySelector(".calculator-button_3");
const btn4 = document.querySelector(".calculator-button_4");
const btn5 = document.querySelector(".calculator-button_5");
const btn6 = document.querySelector(".calculator-button_6");
const btn7 = document.querySelector(".calculator-button_7");
const btn8 = document.querySelector(".calculator-button_8");
const btn9 = document.querySelector(".calculator-button_9");
const btnInit = document.querySelector(".calculator-button_init");
const btnPlus = document.querySelector(".calculator-button_plus");
const btnMinus = document.querySelector(".calculator-button_minus");
const btnMulti = document.querySelector(".calculator-button_multi");
const btnDivide = document.querySelector(".calculator-button_divide");
const btnEqual = document.querySelector(".calculator-button_equal");
/* add comment */

const OPERATOR = 1;
const NUMBER = 0;
const NONE = -1;
const EQUAL = 0;
const PLUS = 1;
const MINUS = 2;
const MULTI = 3;
const DIVIDE = 4;

let totalValue = 0;
let prevInput = NUMBER; // 직전에 입력된 것의 종류 (OPERATOR or NUMBER)
let calMode = NONE;
// 직전의 연산자 기록 :  -1 = nothing, 0=equal,  1 = plus, 2=minus, 3=multi, 4=divide

function getValue() {
  let value = result.innerText;
  value = parseFloat(value);
  return value;
}

function showValue() {
  result.innerText = totalValue.toString();
}

function handleBtn0(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "0";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "0";
    }
  }
  prevInput = NUMBER;
}

function handleBtn1(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "1";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "1";
    } else {
      result.innerText = "1";
    }
  }
  prevInput = NUMBER;
}

function handleBtn2(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "2";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "2";
    } else {
      result.innerText = "2";
    }
  }
  prevInput = NUMBER;
}

function handleBtn3(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "3";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "3";
    } else {
      result.innerText = "3";
    }
  }
  prevInput = NUMBER;
}
function handleBtn4(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "4";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "4";
    } else {
      result.innerText = "4";
    }
  }
  prevInput = NUMBER;
}
function handleBtn5(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "5";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "5";
    } else {
      result.innerText = "5";
    }
  }
  prevInput = NUMBER;
}
function handleBtn6(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "6";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "6";
    } else {
      result.innerText = "6";
    }
  }
  prevInput = NUMBER;
}
function handleBtn7(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "7";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "7";
    } else {
      result.innerText = "7";
    }
  }
  prevInput = NUMBER;
}
function handleBtn8(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "8";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "8";
    } else {
      result.innerText = "8";
    }
  }
  prevInput = NUMBER;
}
function handleBtn9(event) {
  if (prevInput === OPERATOR) {
    result.innerText = "9";
  } else {
    if (result.innerText !== "0") {
      result.innerText += "9";
    } else {
      result.innerText = "9";
    }
  }
  prevInput = NUMBER;
}

function handleInit(event) {
  totalValue = 0;
  calMode = NONE;
  prevInput = NUMBER;
  result.innerText = "0";
}

function handleEqual(event) {
  if (calMode === PLUS) {
    totalValue += getValue();
  } else if (calMode === MINUS) {
    totalValue -= getValue();
  } else if (calMode === MULTI) {
    totalValue *= getValue();
  } else if (calMode === DIVIDE) {
    totalValue /= getValue();
  } else {
    totalValue = getValue();
  }
  calMode = NONE;
  prevInput = OPERATOR;
  showValue();
}

function handlePlus(event) {
  if (prevInput === NUMBER) {
    switch (calMode) {
      case NONE:
        totalValue = getValue();
        break;
      case PLUS:
        totalValue += getValue();
        break;
      case MINUS:
        handleMinus();
        break;
      case MULTI:
        handleMulti();
        break;
      case DIVIDE:
        handleDivide();
        break;
      case EQUAL:
        break;
    }
  }
  calMode = PLUS;
  prevInput = OPERATOR;
  showValue();
}

function handleMinus(event) {
  if (prevInput === NUMBER) {
    switch (calMode) {
      case NONE:
        totalValue = getValue();
        break;
      case PLUS:
        handlePlus();
        break;
      case MINUS:
        totalValue -= getValue();
        break;
      case MULTI:
        handleMulti();
        break;
      case DIVIDE:
        handleDivide();
        break;
      case EQUAL:
        break;
    }
  }
  calMode = MINUS;
  prevInput = OPERATOR;
  showValue();
}

function handleMulti(event) {
  if (prevInput === NUMBER) {
    switch (calMode) {
      case NONE:
        totalValue = getValue();
        break;
      case PLUS:
        handlePlus();
        break;
      case MINUS:
        handleMinus();
        break;
      case MULTI:
        totalValue *= getValue();
        break;
      case DIVIDE:
        handleDivide();
        break;
      case EQUAL:
        break;
    }
  }
  calMode = MULTI;
  prevInput = OPERATOR;
  showValue();
}

function handleDivide(event) {
  if (prevInput === NUMBER) {
    switch (calMode) {
      case NONE:
        totalValue = getValue();
        break;
      case PLUS:
        handlePlus();
        break;
      case MINUS:
        handleMinus();
        break;
      case MULTI:
        handleMulti();
        break;
      case DIVIDE:
        totalValue /= getValue();
        break;
      case EQUAL:
        break;
    }
  }
  calMode = DIVIDE;
  prevInput = OPERATOR;
  showValue();
}

function init() {
  btn0.addEventListener("click", handleBtn0);
  btn1.addEventListener("click", handleBtn1);
  btn2.addEventListener("click", handleBtn2);
  btn3.addEventListener("click", handleBtn3);
  btn4.addEventListener("click", handleBtn4);
  btn5.addEventListener("click", handleBtn5);
  btn6.addEventListener("click", handleBtn6);
  btn7.addEventListener("click", handleBtn7);
  btn8.addEventListener("click", handleBtn8);
  btn9.addEventListener("click", handleBtn9);
  btnInit.addEventListener("click", handleInit);
  btnPlus.addEventListener("click", handlePlus);
  btnMinus.addEventListener("click", handleMinus);
  btnMulti.addEventListener("click", handleMulti);
  btnDivide.addEventListener("click", handleDivide);
  btnEqual.addEventListener("click", handleEqual);
  getValue();
}

init();
