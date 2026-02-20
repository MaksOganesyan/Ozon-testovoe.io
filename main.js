const DEG_PER_PERCENT = 3.6;
const MIN = 0;
const MAX = 100;

const indicator = document.querySelector('.indicator');
const valueInput = document.getElementById('value');
const animateCheckbox = document.getElementById('animate');
const hideCheckbox = document.getElementById('hide');

valueInput.value = 75;

function setProgress(value) {
  const num = Math.min(MAX, Math.max(MIN, Number(value) || 0));
  const deg = num * DEG_PER_PERCENT;
  indicator.style.background = `conic-gradient(#005bff ${deg}deg, #eff3f6 ${deg}deg)`;
  indicator.setAttribute('aria-valuenow', num);
}

function syncInput() {
  const num = Math.min(MAX, Math.max(MIN, Number(valueInput.value) || 0));
  valueInput.value = num;
  setProgress(num);
}

valueInput.addEventListener('input', () => setProgress(valueInput.value));
valueInput.addEventListener('blur', syncInput);

animateCheckbox.addEventListener('change', () => {
  indicator.classList.toggle('rotate', animateCheckbox.checked);
});

hideCheckbox.addEventListener('change', () => {
  indicator.style.visibility = hideCheckbox.checked ? 'hidden' : 'visible';
});

setProgress(75);
