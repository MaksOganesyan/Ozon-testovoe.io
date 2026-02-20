const DEG_PER_PERCENT = 3.6;
const MIN = 0;
const MAX = 100;

function clamp(value) {
  const num = Number(value) || 0;
  if (num < MIN) return MIN;
  if (num > MAX) return MAX;
  return num;
}

function ProgressBlock(indicator) {
  let value = 0;
  let animated = false;
  let hidden = false;

  function update() {
    const deg = value * DEG_PER_PERCENT;
    indicator.style.setProperty('--deg', deg + 'deg');
    indicator.setAttribute('aria-valuenow', value);
    indicator.style.visibility = hidden ? 'hidden' : 'visible';

    if (animated) {
      indicator.classList.add('rotate');
    } else {
      indicator.classList.remove('rotate');
    }
  }

  return {
    setValue: function(v) {
      value = clamp(v);
      update();
    },
    setAnimated: function(on) {
      animated = on;
      update();
    },
    setHidden: function(on) {
      hidden = on;
      update();
    },
    getState: function() {
      return { value, animated, hidden };
    }
  };
}

const indicator = document.querySelector('.indicator');
const progress = ProgressBlock(indicator);
window.ProgressAPI = progress;

const valueInput = document.getElementById('value');
const animateCheckbox = document.getElementById('animate');
const hideCheckbox = document.getElementById('hide');

valueInput.value = 75;
progress.setValue(75);

valueInput.addEventListener('input', function() {
  progress.setValue(this.value);
});


valueInput.addEventListener('blur', function() {
  const num = clamp(this.value);
  this.value = num;
  progress.setValue(num);
});

animateCheckbox.addEventListener('change', function() {
  progress.setAnimated(this.checked);
});

hideCheckbox.addEventListener('change', function() {
  progress.setHidden(this.checked);
});
