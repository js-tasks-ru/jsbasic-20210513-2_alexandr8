function hideSelf() {
  // ваш код...
  let button = document.querySelector('.hide-self-button');
  button.addEventListener('click', () => button.setAttribute('hidden', true));
}
