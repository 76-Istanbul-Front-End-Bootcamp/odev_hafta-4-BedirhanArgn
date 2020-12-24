const data = {
  USD: { EUR: 0.82, GBP: 0.74,BGN:1.61},
  EUR: { USD: 1.23, GBP: 0.91,BGN:1.96 },
  GBP: { USD: 1.35, EUR: 1.1,BGN:2.15},
  BGN: {USD:0.62, EUR:0.51,GBP:0.47}
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function () {
  const fromTarget = document.querySelector("input[name='currency_from']:checked");
  let fromValue;
  if (fromTarget) {
    fromValue = fromTarget.value;
  } else {
    const result = document.querySelector("#currency-result");
    result.innerHTML = "Lütfen 'FROM' kısmını seçiniz";
    toastr.warning('Lütfen FROM kısmını farklı seçiniz')
  }
  const toTarget = document.querySelector("input[name='currency_to']:checked")
  
  let targetValue;
  if (toTarget) {
    targetValue=toTarget.value;
    if(toTarget.value===fromTarget.value) {
      const result = document.querySelector("#currency-result");
      result.innerHTML = "Lütfen 'FROM' ve 'TO' kısmını farklı seçiniz";
      toastr.warning('Lütfen FROM ve TO kısmını farklı seçiniz')
    }
  }
  else {
    if(!fromValue){
      const result = document.querySelector("#currency-result");
      result.innerHTML = "Lütfen 'FROM' ve 'TO' kısmını seçiniz";
      toastr.warning('Lütfen FROM ve TO kısmını farklı seçiniz')
    }
    else{
    const result = document.querySelector("#currency-result");
    result.innerHTML = "Lütfen 'TO' kısmını seçiniz";
    toastr.warning('Lütfen TO kısmını farklı seçiniz')
    }
  }
if((targetValue&&fromValue)&&targetValue!==fromValue) {
  const amount = document.querySelector("input[name='amount']").value;
  if(Number(amount)){
  const currentCurrencyObject = data[fromValue];
  const resultForOne = currentCurrencyObject[targetValue];
  const result = amount * resultForOne;

  const currencyResult = document.querySelector("#currency-result");
  currencyResult.innerHTML =
    amount + " " + fromValue + " = " + result + " " + targetValue;
  }
  else {
    const result = document.querySelector("#currency-result");
    result.innerHTML = "Lütfen 'SAYI' giriniz";
    toastr.warning('Lütfen SAYI giriniz')
  }
  }
});