// Отрисовать фотографии других пользователей
import {getRandomInteger} from './util.js';

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
  const divElement = makeElement('div');
  const newElement = template.cloneNode(true);
  imgUrl.src = 'photos/5.jpg';
  userComments.textContent = 15;
  userLikes.textContent = 134;
  fragment.appendChild(divElement);
  divElement.appendChild(newElement);

  return divElement;
}

makeUserMiniatures();

userPictures.appendChild(fragment);
