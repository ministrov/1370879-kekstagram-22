const editingForm = document.querySelector('.img-upload__overlay');
const closeEditingForm = editingForm.querySelector('.img-upload__cancel');
editingForm.classList.remove('hidden');
document.body.classList.add('modal-open');
closeEditingForm.addEventListener('click', function () {
  editingForm.classList.add('hidden');
})
