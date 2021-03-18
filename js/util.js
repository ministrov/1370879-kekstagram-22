// Получение случайного целого числа в заданном интервале, включительно

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
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

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
}

// Debounce function

const debounce = (cb, ms) => {
  let timeout;
  return () => {
    const fnCall = () => cb.apply(this)
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  }
}

export {
  getRandomInteger,
  getRandomArrayEl,
  isEscEvent,
  debounce,
  shuffleArray
}
