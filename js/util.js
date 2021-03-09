// Получение случайного целого числа в заданном интервале, включительно

const Keys = {
  ESC: 'Escape' || 'Esc',
}

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для проверки максимальной длины строки

const getMaxStringLength = (text, sign) => {
  return text.length <= sign ? true : false;
}

getMaxStringLength('Hello World', 10);

// El - element
const getRandomArrayEl = (array, min, max) => {
  return array[getRandomInteger(min, max - 1)];
}

// Нажатие  на кнопу ESC
const isEscEvent = (evt) => {
  return evt.key === Keys.ESC;
}

export {
  getRandomInteger,
  getRandomArrayEl,
  isEscEvent
}
