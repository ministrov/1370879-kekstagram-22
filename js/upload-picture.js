/*global noUiSlider:readonly*/
import {hashTagInput, descriptionText} from './validate-form.js';
import {isEscEvent} from './util.js';

const imagesTypes = ['gif', 'jpg', 'jpeg', 'png'];
let scale = 100;
const percent = '%';
const pixel = 'px';
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
const effectLevel = editingForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = editingForm.querySelector('.effect-level__slider');
const uploadPreviewImg = editingForm.querySelector('.img-upload__preview').querySelector('img');
const effectLevelValue = editingForm.querySelector('.effect-level__value');
const effectsPreview = document.querySelectorAll('.effects__preview');
const defaultEffect = editingForm.querySelector('#effect-none');

const closeEditingFormOnClick = () => {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  uploadPreviewImg.style.transform = 'scale(1)';
  uploadPreviewImg.style.filter = 'none';
  hashTagInput.style.border = 'none';
  hashTagInput.value = '';
  descriptionText.value = '';
  effectLevelValue.value = Slider.MAX;
  scale = 100;
  scaleControlInput.value = `${scale}%`;
  uploadPreviewImg.style.filter = effects['none']();
  closeEditingForm.removeEventListener('click', closeEditingFormOnClick);
  defaultEffect.checked = true;
  document.removeEventListener('keydown', closeEditingFormOnEsc);
};
const closeEditingFormOnEsc = (evt) => {
  if (isEscEvent(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeEditingFormOnClick();
  }
};
uploadInput.addEventListener('change', (evt) => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = imagesTypes.some((it) => {
    return fileName.endsWith(it);
  })
  const reader = new FileReader();
  if (evt.target.value !== '' && matches) {
    editingForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    effectLevel.classList.add('hidden');
    scale = 100;
    reader.addEventListener('load', () => {
      uploadPreviewImg.src = reader.result;
      for (let i = 0; i < effectsPreview.length; i++) {
        effectsPreview[i].style.background = `url(${reader.result})`;
        effectsPreview[i].style.backgroundSize = 'contain';
        effectsPreview[i].style.backgroundPosition = 'center';
        effectsPreview[i].style.backgroundRepeat = 'no-repeat';
      }
    })
    closeEditingForm.addEventListener('click', closeEditingFormOnClick);
    document.addEventListener('keydown', closeEditingFormOnEsc);
  }
  reader.readAsDataURL(file);
});


scaleControlBigger.addEventListener('click', () => {
  if (scale < Size.MAX) {
    scale += Size.MIN;
  }
  uploadPreviewImg.style.transform = `scale(${scale / 100})`;
  scaleControlInput.value = `${scale}%`;
});

scaleControlSmaller.addEventListener('click', () => {
  if (scale > Size.MIN) {
    scale -= Size.MIN;
  }
  uploadPreviewImg.style.transform = `scale(${scale / 100})`;
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
  sepia: () => {
    return `sepia(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  marvin: () => {
    return `invert(${parseInt(effectLevelValue.value, 10) * 1}${percent})`;
  },
  phobos: () => {
    return `blur(${parseInt(effectLevelValue.value, 10) * 0.1}${pixel})`;
  },
  heat: () => {
    return `brightness(${parseInt(effectLevelValue.value, 10) * 0.1})`;
  },
};


const clickOnEffectRadioGroup = (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    if (evt.target.classList.contains('effects__preview--none')) {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
    if (lastClass !== '') {
      uploadPreviewImg.classList.remove(lastClass);
    }
    let currentClass = evt.target.classList[1];
    lastClass = currentClass;
    effectLevelValue.value = Size.MAX;
    effectLevelSlider.noUiSlider.set(Size.MAX);
    uploadPreviewImg.classList.add(currentClass);
    uploadPreviewImg.style.filter = effects[currentClass.replace('effects__preview--', '')]();
  }
};

effectRadioGroup.addEventListener('click', clickOnEffectRadioGroup);
noUiSlider.create(effectLevelSlider, {
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

export {
  closeEditingFormOnClick,
  editingForm,
  uploadInput,
  uploadPreviewImg,
  hashTagInput
};
