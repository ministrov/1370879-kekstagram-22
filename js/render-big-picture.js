import {isEscEvent} from './util.js';

const COMMENT_QUANTITY = 5;
const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');

const renderComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  const img = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');
  img.src = comment.avatar;
  img.alt = comment.name;
  commentText.textContent = comment.message;

  return commentElement;
}

let start = 0;

const renderComments = (comments) => {
  let i = start;
  while (i < start + 5 && i < comments.length) {
    socialComments.appendChild(renderComment(comments[i]));
    i++;
  }
  start += 5;
  if (start >= comments.length) {
    socialCommentsCount.childNodes[0].textContent = `${comments.length} из `;
    commentsLoader.classList.add('hidden');
  } else {
    socialCommentsCount.childNodes[0].textContent = `${start} из `;
  }
}

const renderBigPicture = (image) => {
  bigPictureImg.src = image.url;
  likesCount.textContent = image.likes;
  commentsCount.textContent = image.comments.length;
  socialCaption.textContent = image.description;
  socialComments.innerHTML = '';
  start = 0;
  if (image.comments.length > COMMENT_QUANTITY) {
    commentsLoader.classList.remove('hidden');
  }
  renderComments(image.comments);
  commentsLoader.onclick = () => {
    renderComments(image.comments);
  }
}

const openBigPicture = (image) => {
  socialCommentsCount.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  renderBigPicture(image);
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', closeBigPictureOnEsc);
}

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  buttonClose.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', closeBigPictureOnEsc);
}

const closeBigPictureOnEsc = (evt) => {
  if (isEscEvent(evt)) {
    closeBigPicture();
  }
}

buttonClose.addEventListener('click', () => {
  closeBigPicture();
});

export default openBigPicture;
