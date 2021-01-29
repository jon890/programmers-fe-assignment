import Const from '../utils/const.js';

export default class ThemeButton {
  $target = null;
  $themeButton = null;
  data = null;

  constructor({ $target }) {
    this.$target = $target;
    this.initTheme();
  }

  initTheme() {
    // os 의 선호 테마 불러오기
    let theme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = Const.DARK_MODE;
    } else {
      theme = Const.LIGHT_MODE;
    }

    this.setState({ theme });
  }

  onClick() {
    const { theme } = this.data;
    let newTheme;
    if (theme == Const.DARK_MODE) {
      newTheme = Const.LIGHT_MODE;
    } else {
      newTheme = Const.DARK_MODE;
    }

    const newData = {
      theme: newTheme,
    };
    this.setState(newData);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    // 이전 버튼 제거
    const button = this.$target.querySelector('.ThemeButton');
    if (button) {
      this.$target.removeChild(button);
    }

    this.$themeButton = document.createElement('button');
    this.$themeButton.className = 'ThemeButton';
    this.$target.appendChild(this.$themeButton);

    let { data: { theme = Const.LIGHT_MODE } = [] } = this;
    const htmlTag = document.documentElement;

    delete htmlTag.dataset.dark;
    delete htmlTag.dataset.light;

    if (theme === Const.DARK_MODE) {
      this.$themeButton.dataset.dark = 'true';
      htmlTag.dataset.dark = 'true';
    } else {
      this.$themeButton.dataset.light = 'true';
      htmlTag.dataset.light = 'true';
    }

    this.bindEvent();
  }

  bindEvent() {
    this.$themeButton.addEventListener('click', this.onClick.bind(this));
  }
}
