import { apiSearch } from '../api/api';
import { ref, reactive } from 'vue';

export function useSearch() {
    const baseUrl = 'https://image.tmdb.org/t/p/w300'; //TMDB圖片URL
    const searchInfo = reactive({ movies: [] });
    const searchPage = ref(1);
    const inputValue = ref('');
    const totalPage = ref(null);

    //搜尋數據
    const search = async() => {
        try{
            const response = await apiSearch(inputValue.value,searchPage.value);
            searchInfo.movies = response.data.results;
            totalPage.value = response.data.total_pages;
        } catch (error) {
            console.error('Error :', error);
        }  

    }

    //取得電影海報
    const getImageUrl = (path) => {
        return `${baseUrl}${path}`;
    };

    return{
        baseUrl,
        searchInfo,
        searchPage,
        inputValue,
        search,
        getImageUrl,
        totalPage
    }
}