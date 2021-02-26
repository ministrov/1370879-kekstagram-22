const editingForm = document.querySelector('.img-upload__overlay');
const closeEditingForm = editingForm.querySelector('.img-upload__cancel');
const scaleControlSmaller = editingForm.querySelector('.scale__control--smaller');
const scaleControlBigger = editingForm.querySelector('.scale__control--bigger');
const scaleControlInput = editingForm.querySelector('.scale__control--value');
const uploadInput = document.querySelector('.img-upload__input');
let scale = 100;
const effectRadioGroup = editingForm.querySelector('.img-upload__effects');
const effectLevel = editingForm.querySelector('.img-upload__effect-level');
const effectLevelInput = editingForm.querySelector('.effect-level__value');

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
  if (scale < 100) {
    scale += 25;
    scaleControlInput.value = `${scale}%`;
  }
});

scaleControlSmaller.addEventListener('click', function () {
  if (scale > 25) {
    scale -= 25;
    scaleControlInput.value = `${scale}%`;
  }
});

effectRadioGroup.addEventListener('click', function (evt) {
  if (evt.target.id === 'effect-none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
});

/* eslint-disable-next-line no-undef */
noUiSlider.create(effectLevelInput, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
})
