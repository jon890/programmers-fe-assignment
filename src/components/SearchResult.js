export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement('div');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  /**
   * 고양이 아이템을 클릭했을 때 동작 정의
   */
  onItemClick(event) {
    const { target } = event;

    if (target.tagName === 'IMG') {
      const { src } = target;
      const index = this.data.findIndex(({ url }) => url === src);

      this.onClick(this.data[index]);
    }
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (!this.data || this.data.length === 0) {
      this.$searchResult.innerHTML = `검색 결과 냥이가 존재하지 않습니다 ㅠ`;
      return false;
    }

    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
            <div 
              class="item" 
              data-tooltip-text="${cat.name}" 
            >
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
      )
      .join('');

    this.bindEvent();
  }

  bindEvent() {
    // SearchResult 에 각 아이템을 클릭하는 이벤트를
    // Event Delegation 기법을 이용해 수정해주세요.
    this.$searchResult.removeEventListener('click', this.onItemClick.bind(this));
    this.$searchResult.addEventListener('click', this.onItemClick.bind(this));
  }
}
