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

const getMaxStringLength = (text, sign) => {
  return text.length <= sign ? true : false;
}

getMaxStringLength('Hello World', 10);

const getRandomArrayEl = (array, min, max) => {
  return array[getRandomInteger(min, max - 1)];
}

const isEscEvent = (evt) => {
  return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
}

const debounce = (cb, ms) => {
  let timeout;
  return (evt) => {
    const fnCall = () => cb.apply(this, [evt])
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
