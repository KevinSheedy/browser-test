// Analytics events will be pushed to this array as objects
// Format of objects still to be confirmed
window.dataLayer = [{ event: 'Pageview', pageName: 'CalculatorExample' }];

const mcxEnvBaseUrls = {
  int: 'https://rhmcxalvd3.mid.aib.pri',
  sys: 'https://rhmcxomvd1.mid.aib.pri',
  pre: 'https://mymortgage.aibtest.ie',
  prd: 'https://mymortgage.aib.ie',
};

let stepNumber = 0;

function handleCalculatorClosed(msg) {
  console.log('Host: Received onClose message from calculator:', msg);
}

function handleEvent(event) {
  console.log('Host: Received event from calculator:', event);
}

window.handleOnLoad = () => {
  renderCalculator(stepNumber);
};

function storeStepNumber(updatedStepNumber) {
  console.log('Host: Received updated stepNumber:', updatedStepNumber);
  stepNumber = updatedStepNumber;
  renderCalculator(stepNumber);
}

window.handleBackClick = () => {
  renderCalculator(stepNumber - 1);
};

function renderCalculator(stepNumber) {
  const containerElem = document.getElementById('root');
  const { renderCalculator } = window.McxCalculator;

  renderCalculator(containerElem, {
    apiBaseUrl: mcxEnvBaseUrls.sys,
    isCalcNavBarVisible: true,
    isAibMobileApp: true,
    hostStepNumber: stepNumber,
    fetchImplementation: window.fetch,
    onCloseCalculator: handleCalculatorClosed, // DEPRECATED
    onChangeStepNumber: storeStepNumber,
    eventListener: handleEvent,
  });
}
