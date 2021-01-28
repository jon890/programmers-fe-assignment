export default class RandomCatButton {
  constructor({ $target, onSearch }) {
    const $RandomCatButton = document.createElement('button');
    this.$RandomCatButton = $RandomCatButton;

    $RandomCatButton.className = 'RandomCatButton';
    $RandomCatButton.innerText = '랜덤 냥이|';
    $target.appendChild($RandomCatButton);

    $RandomCatButton.addEventListener('click', (e) => {
      e.preventDefault();
      onSearch();
    });
  }
}
