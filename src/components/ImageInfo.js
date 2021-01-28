/**
 * 고양이 상세정보 모달 컴포넌트 클래스
 */
export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  /**
   * 모달 바깥을 클릭했을 때 일어나는 동작 정의
   */
  onOuterModalClick(e) {
    const $modal = this.$imageInfo.querySelector('.content-wrapper');

    if (~e.path.findIndex((htmlElement) => htmlElement === $modal)) {
      // 경로에 모달이 포함되어있지 않으면 종료
    } else {
      this.onClose();
    }
  }

  onEscapeKeyUp(e) {
    const { visible } = this.data;

    // 모달이 보이는 상태에서 Escape를 누르면 모달을 종료한다
    if (visible && e.key === 'Escape') {
      this.onClose();
    }
  }

  onClose() {
    // 이전 상태의 불변성을 유지하고
    // 새로운 상태의 vislble을 false로 변경한다
    const data = this.data;
    const newData = {
      ...data,
      visible: false,
    };

    this.setState(newData);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { id, name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
      this.$imageInfo.style.display = 'block';
    } else {
      this.$imageInfo.style.display = 'none';
    }

    this.bindEvents();
  }

  /**
   * 이벤트를 바인딩 하는 함수
   */
  bindEvents() {
    // 필수 이미지를 검색한 후 결과로 주어진 이미지를 클릭하면 모달이 뜨는데,
    // 모달 영역 밖을 누르거나
    this.$imageInfo.removeEventListener('click', this.onOuterModalClick.bind(this));
    this.$imageInfo.addEventListener('click', this.onOuterModalClick.bind(this));

    // 키보드의 ESC 키를 누르거나
    document.removeEventListener('keyup', this.onEscapeKeyUp.bind(this));
    document.addEventListener('keyup', this.onEscapeKeyUp.bind(this));

    // 모달 우측의 닫기(x) 버튼을 누르면 닫히도록 수정해야 합니다.
    const $closeButton = this.$imageInfo.querySelector('.close');
    if ($closeButton) {
      $closeButton.removeEventListener('click', this.onClose.bind(this));
      $closeButton.addEventListener('click', this.onClose.bind(this));
    }
  }
}
