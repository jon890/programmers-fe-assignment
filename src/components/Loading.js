/**
 * 로딩중임을 UI적으로 알려주는 컴포넌트 클래스
 */
export default class Loading {
  data = null;

  constructor({ $target }) {
    const $wrapper = document.createElement('div');
    $wrapper.className = 'loading-wrapper';
    this.$wrapper = $wrapper;

    $target.appendChild($wrapper);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const { loading } = this.data;
    const $wrapper = this.$wrapper;

    if (loading) {
      $wrapper.style.background = 'rgba(0, 0, 0, 0.2)';
      $wrapper.style.zIndex = 0; // 앞쪽 컨트롤 불가능하게 설정
      $wrapper.innerHTML = `
            <div class="loading"></div>
          `;
    } else {
      $wrapper.style.background = 'rgba(0, 0, 0, 0)';
      $wrapper.style.zIndex = -100;
      $wrapper.innerHTML = '';
    }
  }
}
