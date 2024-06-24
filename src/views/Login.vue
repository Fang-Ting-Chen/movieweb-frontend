<template>
    <div class="homeContainer  homeBG2 d-flex justify-content-center align-items-center loginHeight" >
    <div class=" d-flex  flex-row align-content-center justify-content-center logindiv  rounded-2">
        <p class=" my-auto mx-auto"><b>以TMDB登入:</b></p>
        <button @click='login' type="button" class="btn btn-primary my-auto mx-auto" style="height:40px">TMDB登入</button>
    </div>
    </div>
</template>


<script>
import { apiLogin, apiCheckLogin } from '../api/api';
import { useStore } from 'vuex'; 
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

export default {
    setup() {

        const store = useStore(); //來訪問 Vuex store
        const router = useRouter();


        const login = async () => {
            try{
                const response = await apiLogin();
                if (response.data.redirectUrl) {
                    window.location.href = response.data.redirectUrl; // 將用戶重定向到驗證 URL
                } else {
                    console.error('Redirect URL not found');
                }
            } catch (error){
                console.error(error);
            }
        };

        
        return {           
            login,          
        }
    }
}

</script>