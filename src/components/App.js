import SearchInput from './SearchInput.js';
import RandomCatButton from './RandomCatButton.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import Loading from './Loading.js';
import api from '../api.js';

export default class App {
  $target = null;
  $header = null;
  $main = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.$header = $target.querySelector('.header');
    this.$main = $target.querySelector('.main');

    this.searchInput = new SearchInput({
      $target: this.$header,
      onSearch: (keyword) => {
        this.loading.setState({
          loading: true,
        });

        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.loading.setState({
            loading: false,
          });
        });
      },
    });

    this.randomCatButton = new RandomCatButton({
      $target: this.$header,
      onSearch: () => {
        this.loading.setState({
          loading: true,
        });

        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.loading.setState({
            loading: false,
          });
        });
      },
    });

    this.searchResult = new SearchResult({
      $target: this.$main.querySelector('section.SearchResult-wrapper'),
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });

        // detail api request and update ui
        this.loading.setState({
          loading: true,
        });
        const { id } = image;
        const catDetailsData = api.fetchCatDetails(id).then(({ data }) => {
          this.imageInfo.setState({
            visible: true,
            image: data,
          });
          this.loading.setState({
            loading: false,
          });
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.loading = new Loading({
      $target,
      data: {
        loading: false,
      },
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
