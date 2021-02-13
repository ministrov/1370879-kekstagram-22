// Отрисовать фотографии других пользователей

const userPictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');
const userComments = templateFragment.querySelector('.picture__comments')
const userLikes = templateFragment.querySelector('.picture__likes');

const fragment = document.createDocumentFragment();

const makeUserMiniatures = function () {
  const newElement = template.cloneNode(true);
  for (let i = 0; i < 5; i++) {
    newElement.classList.add('user-miniatures');
    userComments.textContent = '15';
    userLikes.textContent = '1534';
    fragment.appendChild(newElement);
  }

  return newElement;
}

makeUserMiniatures();

userPictures.appendChild(fragment);
