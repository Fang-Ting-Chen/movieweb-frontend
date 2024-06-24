<template>

<div class="homeContainer  ">

    
    <div class="homeBG1 pb-5 ">
        <p class="text-white display-6 p-5"><b>歡迎!<br>數以百萬計的電影等待被發現，現在就探索吧。</b></p>

        <div class="input-group mx-auto " style="width: 400px;">        
            <input type="search" id="search" name="search" v-model="inputValue" @keydown.enter.prevent="performSearch" class="form-control"placeholder="搜尋電影..." >
            <button class="btn btn-primary" type="submit" @click="clickSearch">搜尋</button> 
        </div>
        

    </div>

    <div class="homeBG3 ">
        <p class="text-center pt-5 text-blue display-6">熱門電影</p>      
            <div class="row flex-nowrap overflow-auto">
                <div v-for="movie in popularMovies.movies" :key="movie.id" class="col-xl-2 col-md-3 col-4">
                    <div  class="text-white card m-3 p-0 border-0 " style="width:150px">               
                        <img :src="getImageUrl(movie.poster_path)" alt="電影海報" class="card-img-top">
                        <div class="card-body bg-header">
                            {{ movie.title }}
                        </div>
                    </div>
                </div>
            </div>     
    </div>
    
    <div class="homeBG2 " >
        <div class="input-group mx-auto p-5" style="width: 400px;"> 
	        <input type="text" class="form-control" placeholder="今天看什麼呢?" disabled>
	        <button class="btn btn-primary" @click="randomMovie">點擊隨機選擇</button> 
        </div>

        <p class="text-center text-white"><ins><b>{{ rdMovie.movie.title }}</b></ins></p>
        <p class="px-5 text-white">{{ rdMovie.movie.overview }}</p>
        <div class="pb-5 ">
            <img :src="getImageUrl(rdMovie.movie.poster_path)" alt="電影海報" style="width:300px" class="d-block mx-auto  border border-white border-5 ">
        </div>
    </div>

</div>

</template>

<script>
import { apiNowPlayingMovie, apiPopularMovie } from '../api/api';
import { ref, reactive, onMounted } from 'vue';
import { useSearch } from '../composables/useSearch';
import { useRouter } from 'vue-router';
import defaultImage from '../assets/images/bg11.jpg';

export default {
    setup() {
        const popularMovies = reactive({ movies: [] });
        const nowPlayingMovies = reactive({ movies: [] });
        const rdMovie = reactive({ movie: [] }); 
        const totalPage = ref(null);
        const baseUrl = 'https://image.tmdb.org/t/p/w500'; //TMDB圖片URL

        const router = useRouter();
       
        const { 
            inputValue,
            search
        } = useSearch();

        //取得熱門電影數據
        const getPopularMovie = async() => {
            try{
                const response = await apiPopularMovie(1);
                console.log(response);
                popularMovies.movies = response.data.results;                         
            } catch (error) {
                console.error('Error :', error);
            }
        };


        //取得現正播映電影數據>總頁數
        const getTotalPage = async() => {
            try{
                const response = await apiNowPlayingMovie(1);
                totalPage.value = response.data.total_pages;
            } catch (error) {
                console.error('Error :', error);
            }
        };        

        //隨機取得某個電影數據
        const randomMovie = async() => {
            try{
                const randomPage = Math.floor(Math.random() * totalPage.value )+1;
                const response = await apiNowPlayingMovie(randomPage);
                nowPlayingMovies.movies = response.data.results;
                const randomNum = Math.floor(Math.random() * (nowPlayingMovies.movies.length-1));
                rdMovie.movie = nowPlayingMovies.movies[randomNum]

            } catch (error) {
                console.error('Error :', error);
            }         
        }

        //取得電影海報
        const getImageUrl = (path) => {
            if(!path){
                return defaultImage
            }else{
            return `${baseUrl}${path}`;
            }
        };

         //enter鍵執行搜尋      
        const performSearch = async () => {
            await search();
            router.push({ name: 'Search' , query: { query: inputValue.value } });
        };

        //點擊執行搜尋
        const clickSearch = async () => {
            await search();
            router.push({ name: 'Search' , query: { query: inputValue.value } });
        };



        onMounted(() => {
            getTotalPage();
            getImageUrl();
            getPopularMovie();
        });

        return{
            getTotalPage,
            randomMovie,
            nowPlayingMovies,
            rdMovie,
            totalPage,
            getImageUrl,
            search,
            inputValue,
            performSearch,
            clickSearch,
            getPopularMovie,
            popularMovies
        }


    }
}
</script>