<template>
    <a href="#" @click="logout">登出</a>  
</template>

<script>
import { apiLogout } from '../api/api';
import { useStore } from 'vuex'; 
import { useRouter } from 'vue-router';

export default {
    setup() {

        const store = useStore(); //來訪問 Vuex store
        const router = useRouter();

        const logout = async() => {
            try{
                const response = await apiLogout();
                
                if (response.status === 200) {
                    store.commit('logout'); //調用 Vuex 的 mutation
                    router.push({ name: 'Login' });
                }else{
                    window.alert('登出失敗');
                }
            } catch(error) {
                console.error('Error :', error);
            }
        }

        return{
            logout
        }
    }
}
</script>