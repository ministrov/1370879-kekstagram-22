// import {editingForm} from './upload-picture.js';

const MAX_SYMBOL = 20;
const MAX_HASHTAG = 5;
const MAX_COMMENTS = 140;
const hashTagInput = document.querySelector('.text__hashtags');
const descriptionText = document.querySelector('.text__description');
const regex = new RegExp(/[^a-zа-яё#]+/i);

hashTagInput.addEventListener('input', () => {
  let invalidMessage = [];
  hashTagInput.setCustomValidity('');
  let inputText = hashTagInput.value.toLowerCase().trim();
  if (!inputText) {
    return
  }
  /*
  const specialSymbolsArr = ['!','@', '#', '$', '%', '^', '&', '*', '()', '-', '=', ','];
  const isContainSpecialSymbols = specialSymbolsArr.some((item) => {
    return item;
  });
  if (isContainSpecialSymbols) {
    invalidMessage.push('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы');
  }*/
  const inputArray = inputText.split(/\s+/);
  if (inputArray.length === 0) {
    return
  }

  const isStartNotHashTag = inputArray.some((item) => {
    return item[0] !== '#';
  });
  if (isStartNotHashTag) {
    invalidMessage.push('Хэштег должен начинаться с символа #');
  }
  const isOnlyLatticeHashTag = inputArray.some((item) => {
    return item === '#';
  });
  if (isOnlyLatticeHashTag) {
    invalidMessage.push('Хештег не может состоять только из одной решенки');
  }
  const isSplitSpaceHashTag = inputArray.some((item) => {
    return item.indexOf('#', 1) >= 1;
  });
  if (isSplitSpaceHashTag) {
    invalidMessage.push('Хештеги разделяются пробелами');
  }
  const isRepeatHashTag = inputArray.some((item, i, arr) => {
    return arr.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatHashTag) {
    invalidMessage.push('Один и тот же хештег не может быть использован дважды')
  }
  const isLongHashTag = inputArray.some((item) => {
    return item.length > MAX_SYMBOL;
  });
  if (isLongHashTag) {
    invalidMessage.push('Максимальная длинна одного хештега 20 символов , включая решетку');
  }
  if (inputArray.length > MAX_HASHTAG) {
    invalidMessage.push ('Нельзя указать больше пяти хештегов');
  }

  const isSpecialChars = inputArray.some((item) => {
    return regex.test(item);
  });
  if (isSpecialChars) {
    invalidMessage.push('Не те буквы')
  }

  if (invalidMessage.length > 0) {
    hashTagInput.setCustomValidity(invalidMessage.join('. \n'));
    hashTagInput.style.border = '2px solid red';
  } else {
    hashTagInput.style.border = 'none';
  }
});

descriptionText.addEventListener('invalid', () => {
  const commentText = descriptionText.value;
  if (commentText > MAX_COMMENTS) {
    descriptionText.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  }
});

export {hashTagInput};
