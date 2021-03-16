// Отрисовать фотографии других пользователей
import openBigPicture from './render-big-picture.js';
import api from './api.js';

const userPictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');
const userComments = templateFragment.querySelector('.picture__comments')
const userLikes = templateFragment.querySelector('.picture__likes');

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

const renderUserImages = () => {
  const fragment = document.createDocumentFragment();
  api.getData().then((data) => {
    data.forEach((item) => {
      fragment.appendChild(renderUserImage(item));
    });
    userPictures.appendChild(fragment);
  }).catch(() => {
    const errorFetchTemplate = document.querySelector('#errorFetch').content;
    const errorFetchBlock = errorFetchTemplate.cloneNode(true);
    document.body.appendChild(errorFetchBlock);
  });
}

renderUserImages();
export {templateFragment};
