export default class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';

    $searchInput.className = 'SearchInput';
    $target.appendChild($searchInput);

    $searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);

        // 키워드를 입력한 상태에서 input 을 클릭할 시에는
        // 기존에 입력되어 있던 키워드가 삭제되도록 만들어야 합니다.
        $searchInput.value = '';
      }
    });

    this.render();
  }
  render() {
    // 페이지 진입 시 포커스가 input 에 가도록 처리
    this.$searchInput.focus();
  }
}
