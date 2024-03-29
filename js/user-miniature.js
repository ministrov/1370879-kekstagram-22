import openBigPicture from './render-big-picture.js';
import {request} from './api.js';
import {getDebounce, shuffleArray} from './util.js';

const RANDOM_PHOTO_QUANTITY = 10;
const RERENDER_DELAY = 500;
const userPictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');
const imgFilter = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

const renderUserImage = ({url, comments, likes}) => {
  const userImage = templateFragment.cloneNode(true);
  const userComments = userImage.querySelector('.picture__comments');
  const userLikes = userImage.querySelector('.picture__likes');
  userImage.querySelector('.picture__img').src = `./${url}`;
  userComments.textContent = comments.length;
  userLikes.textContent = likes;

  userImage.addEventListener('click', () => {
    openBigPicture({url, comments, likes});
  });

  return userImage;
}

const renderPhotos = (data) => {
  let fragment = document.createDocumentFragment();
  data.forEach((item) => {
    fragment.appendChild(renderUserImage(item));
  });

  userPictures.appendChild(fragment);
}

const removePhotos = () => {
  const pictures = userPictures.querySelectorAll('.picture');
  if (pictures) {
    pictures.forEach((photo) => {
      photo.remove()
    })
  }
}

let photos = [];

const filters = {
  'filter-default': () => {
    return photos.slice()
  },
  'filter-random': () => {
    return shuffleArray(photos.slice()).slice(0, RANDOM_PHOTO_QUANTITY)
  },
  'filter-discussed': () => {
    return photos.slice().sort((a, b) => a.comments.length - b.comments.length).reverse();
  },
}

const clickOnFilterForm = getDebounce((evt) => {
  if (!evt.target.classList.contains('img-filters__button--active')) {
    for (let i = 0; i < filterForm.children.length; i++) {
      filterForm.children[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
    removePhotos();
    renderPhotos(filters[evt.target.id]());
  }
}, RERENDER_DELAY);

const renderUserImages = () => {
  request((data) => {
    photos = data.slice();
    renderPhotos(photos)
    imgFilter.classList.remove('img-filters--inactive');
    filterForm.addEventListener('click', clickOnFilterForm);
  }, () => {
    const errorFetchTemplate = document.querySelector('#errorFetch').content;
    const errorFetchBlock = errorFetchTemplate.cloneNode(true);
    document.body.appendChild(errorFetchBlock);
  }, 'GET');
}

renderUserImages();

export {templateFragment};
