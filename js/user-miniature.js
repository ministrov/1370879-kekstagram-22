// Отрисовать фотографии других пользователей
import objectsArray from './data.js';

const userPictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');
const userComments = templateFragment.querySelector('.picture__comments')
const userLikes = templateFragment.querySelector('.picture__likes');

const renderUserImage = function ({url, comments, likes}) {
  const userImage = templateFragment.cloneNode(true);
  userImage.querySelector('.picture__img').src = url;
  userComments.textContent = comments;
  userLikes.textContent = likes;

  return userImage;
}

const renderUserImages = function () {
  const fragment = document.createDocumentFragment();
  objectsArray.forEach((item) => {
    fragment.appendChild(renderUserImage(item));
  });

  userPictures.appendChild(fragment)
}

renderUserImages();
