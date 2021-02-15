// Отрисовать фотографии других пользователей
import {SIMILAR_OBJECTS_QUANTITY} from './data.js';

const userPictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');
const userComments = template.querySelector('.picture__comments')
const userLikes = template.querySelector('.picture__likes');
const imgUrl = template.querySelector('.picture__img');

const fragment = document.createDocumentFragment();

const makeElement = function (tagName) {
  const element = document.createElement(tagName);
  element.classList.add('user-miniatures');

  return element;
}

const makeUserMiniatures = function () {
  for (let i = 0; i <= SIMILAR_OBJECTS_QUANTITY; i++) {
    const divElement = makeElement('div');
    const newElement = template.cloneNode(true);
    imgUrl.src = `photos/${i + 1}.jpg`;
    userComments.textContent = 15;
    userLikes.textContent = 134;
    divElement.appendChild(newElement);
    fragment.appendChild(divElement);
  }
}

makeUserMiniatures();

userPictures.appendChild(fragment);
