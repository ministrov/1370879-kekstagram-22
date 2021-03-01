/* noUiSlider */

let scale = 100;

const Size = {
  MAX: 100,
  MIN: 25,
};

const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
};

const editingForm = document.querySelector('.img-upload__overlay');
const closeEditingForm = editingForm.querySelector('.img-upload__cancel');
const scaleControlSmaller = editingForm.querySelector('.scale__control--smaller');
const scaleControlBigger = editingForm.querySelector('.scale__control--bigger');
const scaleControlInput = editingForm.querySelector('.scale__control--value');
const uploadInput = document.querySelector('.img-upload__input');
const effectRadioGroup = editingForm.querySelector('.img-upload__effects');
// const effectLevel = editingForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = editingForm.querySelector('.effect-level__slider');
const uploadPreviewImg = editingForm.querySelector('.img-upload__preview').querySelector('img');
const effectLevelValue = editingForm.querySelector('.effect-level__value');

const onCloseEditingFormClick = function () {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadInput.value = '';

  closeEditingForm.removeEventListener('click', onCloseEditingFormClick);
};

uploadInput.addEventListener('change', function (evt) {
  if (evt.target.value !== '') {
    editingForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    scale = 100;
    closeEditingForm.addEventListener('click', onCloseEditingFormClick);
  }
});


scaleControlBigger.addEventListener('click', function () {
  if (scale < Size.MAX) {
    scale += 25;
  }
  scaleControlInput.value = `${scale}%`;
});

scaleControlSmaller.addEventListener('click', function () {
  if (scale > 25) {
    scale -= 25;
  }
  scaleControlInput.value = `${scale}%`;
});


let lastClass = '';

const effects = {
  chrome: () => {
    return `grayscale(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  none: () => {
    return 'none';
  },
};

const onEffectRadioGroupClick = (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    if (lastClass !== '') {
      uploadPreviewImg.classList.remove(lastClass);
    }
    let currentClass = evt.target.classList[1];
    lastClass = currentClass;

    uploadPreviewImg.classList.add(currentClass);
    uploadPreviewImg.style.filter = effects[currentClass.replace('effects__preview--', '')]();
  }
};

effectRadioGroup.addEventListener('click', onEffectRadioGroupClick);

window.noUiSlider.create(effectLevelSlider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('change', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();

  uploadPreviewImg.style.filter = effects[lastClass.replace('effects__preview--', '')]();
});
