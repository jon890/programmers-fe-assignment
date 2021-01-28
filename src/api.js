const API_ENDPOINT = 'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';
const API_CATS_ENDPOINT = `${API_ENDPOINT}/api/cats`;

const request = async (url) => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (e) {
    console.warn(e);
    alert('오류가 발생했어요! 다시 시도해주세요\n오류가 반복된다면 관리자에게 문의해주세요!');
  }
};

const api = {
  fetchCats: async (keyword) => {
    const catsData = await request(`${API_CATS_ENDPOINT}/search?q=${keyword}`);
    return catsData;
  },

  /**
   * 1. GET /cats/random50
    {
      "data": [{
        id: string
        url: string
        name: string
      }]
    }
   */
  fetchRandomCats: async () => {
    const randomCatsData = await request(`${API_CATS_ENDPOINT}/random50`);
    return randomCatsData;
  },

  /**
   * 3. GET /cats/:id
   * 
    {
      "data": {
        name: string
        id: string
        url: string
        width: number
        height: number
        temperament: string
        origin: string
      }
    }
   */
  fetchCatDetails: async (id) => {
    const catDetailData = await request(`${API_CATS_ENDPOINT}/${id}`);
    return catDetailData;
  },
};

export default api;
