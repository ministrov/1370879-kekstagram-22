const editingForm = document.querySelector('.img-upload__overlay');
const closeEditingForm = editingForm.querySelector('.img-upload__cancel');

const uploadInput = document.querySelector('.img-upload__input');

const onCloseEditingFormClick = function () {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadInput.value = '';

  closeEditingForm.removeEventListener('click', onCloseEditingFormClick);
};

uploadInput.addEventListener('change', function (evt) {
  if (evt.target.value !== '') {
    editingForm.classList.remove('hidden');
    document.body.classList.add('modal-open');

    closeEditingForm.addEventListener('click', onCloseEditingFormClick);
  }
});
