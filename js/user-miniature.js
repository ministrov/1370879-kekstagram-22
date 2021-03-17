// Отрисовать фотографии других пользователей
import openBigPicture from './render-big-picture.js';
import api from './api.js';
import {getRandomArrayEl} from './util.js';

const RANDOM_PHOTO_QUANTITY = 10;
const userPictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');
const userComments = templateFragment.querySelector('.picture__comments')
const userLikes = templateFragment.querySelector('.picture__likes');
const imgFilter = document.querySelector('.img-filters');
const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const renderUserImage = ({url, comments, likes}) => {
  const userImage = templateFragment.cloneNode(true);
  userImage.querySelector('.picture__img').src = url;
  userComments.textContent = comments.length;
  userLikes.textContent = likes;
  userImage.addEventListener('click', () => {
    openBigPicture({url, comments, likes});
  });
  return userImage;
}

const defaultFilter = (data) => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    fragment.appendChild(renderUserImage(item));
  });
  userPictures.appendChild(fragment);
}

const discussedFilter = (data) => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());
  const filtered = data.sort((item1, item2) => item2.comments.length - item1.comments.length);
  const fragment = document.createDocumentFragment();
  filtered.forEach((item) => fragment.appendChild(renderUserImage(item)));
  userPictures.appendChild(fragment);
}

const randomFilter = (data) => {
  let randomEls = [];
  const fragment = document.createDocumentFragment();
  document.querySelectorAll('.picture').forEach((item) => item.remove());
  while (randomEls.length < RANDOM_PHOTO_QUANTITY) {
    const randomEl = getRandomArrayEl(data, 0, data.length);
    if (!randomEls.includes(randomEl)) {
      randomEls.push(randomEl);
      fragment.appendChild(renderUserImage(randomEl));
    }
  }
  userPictures.appendChild(fragment);
}

const renderUserImages = () => {
  const fragment = document.createDocumentFragment();
  api.getData().then((data) => {
    data.forEach((item) => {
      fragment.appendChild(renderUserImage(item));
    });
    userPictures.appendChild(fragment);
    imgFilter.classList.remove('img-filters--inactive');
    buttonRandom.addEventListener('click', () => randomFilter(data));
    buttonDiscussed.addEventListener('click', () => discussedFilter(data));
    buttonDefault.addEventListener('click', () => defaultFilter(data));
  }).catch(() => {
    const errorFetchTemplate = document.querySelector('#errorFetch').content;
    const errorFetchBlock = errorFetchTemplate.cloneNode(true);
    document.body.appendChild(errorFetchBlock);
  });
}

renderUserImages();
export {templateFragment};
