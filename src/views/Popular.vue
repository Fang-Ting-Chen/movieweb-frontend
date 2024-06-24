<template>
<div class="bg-bd container-fluid">
<div class="container">
    <p class="text-white text-center pt-5 display-6">熱門電影</p>

    <div class="row ">
        <div v-for="movie in popularMovies.movies" :key="movie.id" class="col-6 col-md-3 col-xl-3">
          <div  class="text-white card m-3 p-0 border-0 cardWidth" >          
            <div  class="overview text-blue ovflowy" >概述: {{movie.overview}}</div>
            <img :src="getImageUrl(movie.poster_path)" alt="電影海報" class="card-img-top">
            <div class="card-body bg-header">
              {{ movie.title }}<br/>放映日: {{ movie.release_date }}
            </div>
            <div class="bg-header card-footer ">
                <div class="text-center pb-3">
                    <button @click.stop="addToWatchList(movie.id)" class="btn btn-secondary showadd2">加入電影列表</button>
                    <button @click.stop="addToWatchList(movie.id)" class="btn btn-secondary showadd rounded-circle">+</button>
                </div>
            </div>
          </div>
        </div>
    </div>

    <ul class="pagination justify-content-center p-5">
        <li class="page-item"><div class="page-link bg-secondary text-white" @click="previousPageButton">上一頁</div></li>
        <li class="page-item"><div class="page-link bg-secondary text-white" @click="previousPageButton">{{ previousPage }}</div></li>
        <li class="page-item"><div class="page-link bg-secondary text-white">{{ currentPage }}</div></li>
        <li class="page-item"><div class="page-link bg-secondary text-white" @click="nextPageButton">{{ nextPage }}</div></li>
        <li class="page-item"><div class="page-link bg-secondary text-white"  @click="nextPageButton">下一頁</div></li>
    </ul>

</div>
</div>
</template>

<script>
import { apiPopularMovie, apiAddToWatchList } from '../api/api';
import { ref, reactive, onMounted, computed } from 'vue';
import { useStore } from 'vuex'; 

export default {
    setup() {

        const popularMovies = reactive({ movies: [] });
        const totalPage = ref(null);
        const currentPage = ref(1);
        const previousPage = ref(0);
        const nextPage = ref(2);
        const baseUrl = 'https://image.tmdb.org/t/p/w300'; //TMDB圖片URL
        const store = useStore(); //來訪問 Vuex store
        const isLogin = computed(() => store.state.isLogin);

        //取得熱門電影數據
        const getPopularMovie = async() => {
            try{
                const response = await apiPopularMovie(currentPage.value);
                console.log(response);
                popularMovies.movies = response.data.results;
                totalPage.value = response.data.total_pages;               
            } catch (error) {
                console.error('Error :', error);
            }
        };

        //下一頁按鈕
        const nextPageButton = () => {
            if (currentPage.value < totalPage.value ) {
                currentPage.value++;
                nextPage.value++;
                previousPage.value++;
                getPopularMovie();
            }
        }

        //上一頁按鈕
        const previousPageButton = () => {
            if (currentPage.value > 1 ) {
                currentPage.value--;
                nextPage.value--;
                previousPage.value--;
                getPopularMovie();
            }
        }    
        
        //(會員)增加電影到觀看電影列表
        const addToWatchList = async(movieID) => {
            if(isLogin.value){
                try{
                const response =await apiAddToWatchList({ mediaId: movieID });
                if (response.status === 200) {
                    window.alert("電影已添加到觀看列表");
                } else {
                    console.error('添加失敗:', response.data);
                }
                }catch (error) {
                    console.error('addToWatchList Error :', error);
                }
            }else{
                window.alert("需登入帳戶");
            }   

        }
        
        //取得電影海報
        const getImageUrl = (path) => {
            return `${baseUrl}${path}`;
        };

        onMounted(() => {
            getPopularMovie();
        });

        return {
            getPopularMovie,
            popularMovies,
            totalPage,
            currentPage,
            previousPage,
            nextPage,
            nextPageButton,
            previousPageButton,
            getImageUrl,
            addToWatchList,
            isLogin
        }

    }
}
</script>