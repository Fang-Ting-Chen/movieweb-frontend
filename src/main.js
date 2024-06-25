import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'

import App from './App.vue'
import store from './store/index.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import Home from './views/Home.vue'
import NowPlaying from './views/NowPlaying.vue'
import Popular from './views/Popular.vue'
import Upcoming from './views/Upcoming.vue'
import Search from './views/Search.vue'
import WatchList from './views/WatchList.vue'
import Login from './views/Login.vue'
import Genre from './views/Genre.vue'

import Header from './components/Header.vue'
import Logout from './components/Logout.vue'
import Footer from './components/Footer.vue'

//創建 vue-router 的實例
const router = createRouter({
    history: createWebHistory(),
    base: '/movieweb-frontend/',
    //配置路由規則
    routes: [
        //path: 用於自訂 url 末尾  ，component: 用於設定要打開的元件
        { path: '/', component: Home, name: 'Home'},
        { path: '/nowplaying', component: NowPlaying, name: 'NowPlaying'},
        { path: '/popular', component: Popular, name: 'Popular'},
        { path: '/upcoming', component: Upcoming, name: 'Upcoming'},
        { path: '/search', component: Search, name: 'Search'},
        { path: '/watchlist', component: WatchList, name: 'WatchList'},
        { path: '/login', component: Login, name: 'Login'},  
        { path: '/genre', component: Genre, name: 'Genre'}     
    ]
});


const app = createApp(App); //創建 vue 的實例

app.use(router); //將router掛載到app實例對象上
app.use(store);

app.component('header-nav',Header)
app.component('logout',Logout)
app.component('footer-footer',Footer)

app.mount('#app');
