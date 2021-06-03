function toggleText() {
  // ваш код...
  let button = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');

  function handler() {
    if (text.hasAttribute('hidden')) {
      text.removeAttribute('hidden');
    } else {
      text.setAttribute('hidden', true);
    }
  }

  button.addEventListener('click', handler);
}
  