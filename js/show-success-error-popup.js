import {isEscEvent} from './util.js';
import {editingForm} from './upload-picture.js';
import {request} from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const onSuccesButtonClick = (evt) => {
  if (evt.currentTarget) {
    const successSection = document.querySelector('.success');
    successSection.remove();
  }
}

const onSuccesButtonEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    const successSection = document.querySelector('.success');
    successSection.remove();
    document.body.removeEventListener('keydown', onSuccesButtonEscKeydown);
  }
}

const onErrorButtonClick = (evt) => {
  if (evt.currentTarget) {
    const errorSection = document.querySelector('.error');
    errorSection.remove();
  }
}

const onErrorButtonEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    const errorSection = document.querySelector('.error');
    errorSection.remove();
    document.removeEventListener('keydown', onErrorButtonEscKeydown);
  }
}

const showSuccessPopup = () => {
  const successTemplateBlock = successTemplate.cloneNode(true);
  document.body.appendChild(successTemplateBlock);
  const successDiv = successTemplateBlock.querySelector('.success__inner');
  const successButton = successTemplateBlock.querySelector('.success__button');
  successDiv.setAttribute('tabindex', '1');
  successDiv.style.outline = 'none';
  successDiv.focus();
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  successButton.addEventListener('click', onSuccesButtonClick);
  document.body.addEventListener('keydown', onSuccesButtonEscKeydown);
}

const showErrorPopup = () => {
  const errorPostTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorPostTemplateBlock = errorPostTemplate.cloneNode(true);
  document.body.appendChild(errorPostTemplateBlock);
  const errorButton = errorPostTemplateBlock.querySelector('.error__button');
  const errorDiv = errorPostTemplateBlock.querySelector('.error__inner');
  errorDiv.setAttribute('tabindex', '1');
  errorDiv.style.outline = 'none';
  errorDiv.focus();
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  errorButton.addEventListener('click', onErrorButtonClick);
  document.body.addEventListener('keydown', onErrorButtonEscKeydown);
  errorDiv.addEventListener('blur', onErrorButtonClick);
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(imgUploadForm);
  request((response) => {
    if (response) {
      showSuccessPopup();
    }
  }, () => {
    showErrorPopup();
  }, 'POST', formData);
});
