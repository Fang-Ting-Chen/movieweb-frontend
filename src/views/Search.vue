<template>
<div class="bg-bd container-fluid">
<div class="container">
    <p class="text-white text-center pt-5 display-6">搜尋</p>
    
    <div class="row ">
        <div v-for="movie in searchInfo.movies" :key="movie.id" class="col-6 col-md-3 col-xl-3">
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
        <li class="page-item"><div class="page-link bg-secondary text-white">{{ searchPage }}</div></li>
        <li class="page-item"><div class="page-link bg-secondary text-white" @click="nextPageButton">{{ nextPage }}</div></li>
        <li class="page-item"><div class="page-link bg-secondary text-white"  @click="nextPageButton">下一頁</div></li>
    </ul>
  
</div>
</div>
</template>

<script>
import { useSearch } from '../composables/useSearch';
import { apiAddToWatchList } from '../api/api';
import { ref,onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'; 


export default {
    setup() {
        const { searchInfo, getImageUrl, inputValue, search, searchPage, totalPage } = useSearch();
        const route = useRoute(); // 获取路由参数
  
        const previousPage = ref(0);
        const nextPage = ref(2);
        

        const store = useStore(); //來訪問 Vuex store
        const isLogin = computed(() => store.state.isLogin);

        //下一頁按鈕
        const nextPageButton = () => {
            if (searchPage.value < totalPage.value ) {
                searchPage.value++;
                nextPage.value++;
                previousPage.value++;
                search();
            }
        }

        //上一頁按鈕
        const previousPageButton = () => {
            if (searchPage.value > 1 ) {
                searchPagee.value--;
                nextPage.value--;
                previousPage.value--;
                search();
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
        onMounted(async () => {
            inputValue.value = route.query.query || '';
            await search();
        });
        return {
            searchInfo,
            getImageUrl,
            nextPageButton,
            previousPageButton,
            previousPage,
            searchPage,
            nextPage,
            addToWatchList,
            isLogin,           
        }
    }
}

</script>