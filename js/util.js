const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  isEscEvent,
  debounce,
  shuffleArray
}
