<template>
<div class="bg-bd container-fluid minh">
<div class="container">
    <p class="text-white text-center pt-5 display-6">待觀看電影</p>

    
    <div class="row ">
        <div v-for="movie in watchListMovies.movies" :key="movie.id" class="col-6 col-md-3 col-xl-3">
          <div  class="text-white card m-3 p-0 border-0 cardWidth" >  
            <div  class="overview text-blue ovflowy" >概述: {{movie.overview}}</div>        
            <img :src="getImageUrl(movie.poster_path)" alt="電影海報" class="card-img-top">
            <div class="card-body bg-header px-auto">
              {{ movie.title }}<br/>放映日: {{ movie.release_date }}
            </div>
            <div class="bg-header card-footer ">
                <div class="text-center pb-3">
                    <button @click.stop="deleteWatchList(movie.id)" class="btn btn-secondary ">刪除電影</button>
                </div>
            </div>
          </div>
        </div>
    </div>

</div>
</div>
</template>


<script>
import { apiWatchList, apiCheckLogin, apiDeleteWatchList } from '../api/api';
import { ref, reactive, onMounted, onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; 

export default {
    setup() {
        const router = useRouter();
        const watchListMovies = reactive({ movies: [] });
        const totalPage = ref(null);
        const currentPage = ref(1);
        const previousPage = ref(0);
        const nextPage = ref(2);
        const baseUrl = 'https://image.tmdb.org/t/p/w300';
        const store = useStore(); //來訪問 Vuex store

        const isLogin = computed(() => store.state.isLogin);

        //取得電影列表數據
        const getWatchList = async() => {
            if(isLogin.value){
                try{
                const response = await apiWatchList(currentPage.value);
               
                watchListMovies.movies = response.data.results;
                totalPage.value = response.data.total_pages;
                
            } catch (error) {
                console.error('Error :', error);
            } 

            }else{
                router.push({ name: 'Login' });
            }
        }

        //取得電影海報
        const getImageUrl = (path) => {
            return `${baseUrl}${path}`;
        };

        //確認是否有登入
        const checkLogin = async() => {
            try{
                const response = await apiCheckLogin();
                console.log('test');
                if (response.data.loggedIn) {           
                    store.commit('login'); //調用 Vuex 的 mutation
                    getWatchList();
                }else{
                    router.push({ name: 'Login' });
                }
            } catch(error) {
                console.error('checkLogin Error :', error);
            }
        }

        //(會員)刪除觀看電影列表中的電影
        const deleteWatchList = async(movieID) => {
            try{
                const response =await apiDeleteWatchList({ mediaId: movieID });
                if (response.status === 200) {
                    window.alert("電影刪除成功");
                    //getWatchList();
                    await getWatchList();
                    //watchListMovies.movies = watchListMovies.movies.filter(movie => movie.id !== movieID);
                } else {
                    console.error('刪除失敗:', response.data);
                }
            }catch (error) {
                console.error('addToWatchList Error :', error);
            }

        }
        
        onMounted(() => {
            console.log('Mounted');
            checkLogin();           
        });

        return{
            getWatchList,
            getImageUrl,
            totalPage,
            currentPage,
            watchListMovies,
            isLogin,
            deleteWatchList
        }
    }
}
</script>