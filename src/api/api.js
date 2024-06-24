import axios from 'axios';

//建立 API 的 Axios 實例
const movie = axios.create({
    baseURL: 'https://movieweb-backend-bj2o.onrender.com', //後端端口 
    withCredentials: true, //跨域請求 測試
    headers: {
        'Content-Type': 'application/json',
    },
});


//獲取上映電影
export const apiNowPlayingMovie = (page) => movie.get(`/nowplaying/${ page }`);
//獲取熱門電影
export const apiPopularMovie = (page) => movie.get(`/popular/${ page }`);
//獲取即將播出電影
export const apiUpcomingMovie = (page) => movie.get(`/upcoming/${ page }`);
//搜尋
export const apiSearch = (keyword,page) => movie.get(`/search/${ keyword }/${ page }`);
//登入
export const apiLogin = () => movie.get('/login');
//登出
export const apiLogout = () => movie.get('/logout');
//(會員)觀看電影列表
export const apiWatchList = (page) => movie.get(`/watchlist/${ page }`)
//電影分類
export const apiGenre = (page,genreid) => movie.get(`/genre/${ page }/${ genreid }`);
//確認登入
export const apiCheckLogin = () => movie.get('/ckecklogin');
//(會員)增加觀看電影列表
export const apiAddToWatchList = (movieID) => movie.post('/addwatchlist',movieID);
//(會員)刪除觀看電影列表
export const apiDeleteWatchList = (movieID) => movie.post('/deletewatchlist',movieID);