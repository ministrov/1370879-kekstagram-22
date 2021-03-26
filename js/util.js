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

const getDebounce = (cb, ms) => {
  let timeout;
  return (evt) => {
    const getFnCall = () => cb.apply(this, [evt])
    clearTimeout(timeout);
    timeout = setTimeout(getFnCall, ms);
  }
}

export {
  isEscEvent,
  getDebounce,
  shuffleArray
}
