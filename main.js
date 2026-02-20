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
    indicator.style.background = 'conic-gradient(#005bff ' + deg + 'deg, #eff3f6 ' + deg + 'deg)';
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
      return { value: value, animated: animated, hidden: hidden };
    }
  };
}

var indicator = document.querySelector('.indicator');
var progress = ProgressBlock(indicator);
window.ProgressAPI = progress;

var valueInput = document.getElementById('value');
var animateCheckbox = document.getElementById('animate');
var hideCheckbox = document.getElementById('hide');

valueInput.value = 75;
progress.setValue(75);

valueInput.addEventListener('input', function() {
  progress.setValue(valueInput.value);
});

valueInput.addEventListener('blur', function() {
  var num = clamp(valueInput.value);
  valueInput.value = num;
  progress.setValue(num);
});

animateCheckbox.addEventListener('change', function() {
  progress.setAnimated(animateCheckbox.checked);
});

hideCheckbox.addEventListener('change', function() {
  progress.setHidden(hideCheckbox.checked);
});
