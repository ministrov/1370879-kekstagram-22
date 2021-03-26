const MAX_SYMBOL = 20;
const MAX_HASHTAG = 5;
const MAX_COMMENTS = 140;
const hashTagInput = document.querySelector('.text__hashtags');
const descriptionText = document.querySelector('.text__description');
const regex = new RegExp(/[^a-zа-яё#]+/i);

hashTagInput.addEventListener('input', () => {
  let invalidMessages = [];
  hashTagInput.setCustomValidity('');
  let inputText = hashTagInput.value.toLowerCase().trim();
  if (!inputText) {
    return
  }

  const inputArray = inputText.split(/\s+/);
  if (inputArray.length === 0) {
    return
  }

  const isStartNotHashTag = inputArray.some((item) => {
    return item[0] !== '#';
  });
  if (isStartNotHashTag) {
    invalidMessages.push('Хэштег должен начинаться с символа #');
  }
  const isOnlyLatticeHashTag = inputArray.some((item) => {
    return item === '#';
  });
  if (isOnlyLatticeHashTag) {
    invalidMessages.push('Хештег не может состоять только из одной решенки');
  }
  const isSplitSpaceHashTag = inputArray.some((item) => {
    return item.indexOf('#', 1) >= 1;
  });
  if (isSplitSpaceHashTag) {
    invalidMessages.push('Хештеги разделяются пробелами');
  }
  const isRepeatHashTag = inputArray.some((item, i, arr) => {
    return arr.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatHashTag) {
    invalidMessages.push('Один и тот же хештег не может быть использован дважды')
  }
  const isLongHashTag = inputArray.some((item) => {
    return item.length > MAX_SYMBOL;
  });
  if (isLongHashTag) {
    invalidMessages.push('Максимальная длинна одного хештега 20 символов , включая решетку');
  }
  if (inputArray.length > MAX_HASHTAG) {
    invalidMessages.push ('Нельзя указать больше пяти хештегов');
  }

  const isSpecialChars = inputArray.some((item) => {
    return regex.test(item);
  });
  if (isSpecialChars) {
    invalidMessages.push('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы');
  }

  if (invalidMessages.length > 0) {
    hashTagInput.setCustomValidity(invalidMessages.join('. \n'));
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
