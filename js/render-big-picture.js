const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');

const renderComment = function (comment) {
  const commentElement = commentTemplate.cloneNode(true);
  const img = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');
  img.src = comment.avatar;
  img.alt = comment.name;
  commentText.textContent = comment.message;

  return commentElement;
}

const renderBigPicture = function (image) {
  bigPictureImg.src = image.url;
  likesCount.textContent = image.likes;
  commentsCount.textContent = image.comments.length;
  for (let i = 0; i < image.comments.length; i++) {
    socialComments.appendChild(renderComment(image.comments[i]));
  }
  socialCaption.textContent = image.description;
}

const openBigPicture = function (image) {
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  renderBigPicture(image);
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
}

const closeBigPicture = function () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}

buttonClose.onclick = () => {
  closeBigPicture();
}

export default openBigPicture;
