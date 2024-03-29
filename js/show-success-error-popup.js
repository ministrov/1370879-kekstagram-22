import {isEscEvent} from './util.js';
import {editingForm, closeEditingFormOnClick} from './upload-picture.js';
import {request} from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const uploadFile = document.querySelector('#upload-file');

const closeSuccesModalOnClick = (evt) => {
  if (evt.currentTarget) {
    const successSection = document.querySelector('.success');
    if (successSection) {
      successSection.remove();
    }
  }
}

const closeSuccesModalOnEsc = (evt) => {
  if (isEscEvent(evt)) {
    const successSection = document.querySelector('.success');
    if (successSection) {
      successSection.remove();
    }
    document.body.removeEventListener('keydown', closeSuccesModalOnEsc);
  }
}

const closeErrorModalOnClick = (evt) => {
  if (evt.currentTarget) {
    const errorSection = document.querySelector('.error');
    if (errorSection) {
      errorSection.remove();
    }
  }
}

const closeErrorModalOnEsc = (evt) => {
  if (isEscEvent(evt)) {
    const errorSection = document.querySelector('.error');
    if (errorSection) {
      errorSection.remove();
    }
    document.removeEventListener('keydown', closeErrorModalOnEsc);
  }
}

const showSuccessPopup = () => {
  const successTemplateBlock = successTemplate.cloneNode(true);
  document.body.appendChild(successTemplateBlock);
  const successDiv = successTemplateBlock.querySelector('.success__inner');
  const successButton = successTemplateBlock.querySelector('.success__button');
  successDiv.tabIndex = 1;
  successDiv.style.outline = 'none';
  successDiv.focus();
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  successButton.addEventListener('click', closeSuccesModalOnClick);
  document.body.addEventListener('keydown', closeSuccesModalOnEsc);
  uploadFile.value = '';
}

const showErrorPopup = () => {
  const errorPostTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorPostTemplateBlock = errorPostTemplate.cloneNode(true);
  document.body.appendChild(errorPostTemplateBlock);
  const errorButton = errorPostTemplateBlock.querySelector('.error__button');
  const errorDiv = errorPostTemplateBlock.querySelector('.error__inner');
  errorDiv.tabIndex = 1;
  errorDiv.style.outline = 'none';
  errorDiv.focus();
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  errorButton.addEventListener('click', closeErrorModalOnClick);
  document.body.addEventListener('keydown', closeErrorModalOnEsc);
  errorDiv.addEventListener('blur', closeErrorModalOnClick);
  uploadFile.value = '';
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(imgUploadForm);
  request((response) => {
    if (response) {
      showSuccessPopup();
      closeEditingFormOnClick();
    }
  }, () => {
    showErrorPopup();
    closeEditingFormOnClick();
  }, 'POST', formData);
});
