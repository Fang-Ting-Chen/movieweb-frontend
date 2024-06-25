<template>
<div class="bg-header p-3">
<div class="container ">
    <div class="d-flex  align-items-center justify-content-between">
    <img :src="logoImage" alt="logo" class="logoimg ">

    <ul class="nav  shownavbutton2">
        <li class="nav-item">
            <router-link to="/movieweb-frontend/" class="nav-link text-white">首頁</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/movieweb-frontend/nowplaying"  class="nav-link text-white">上映電影</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/movieweb-frontend/popular" class="nav-link text-white">熱門電影</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/movieweb-frontend/upcoming" class="nav-link text-white">即將上映電影</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/movieweb-frontend/genre" class="nav-link text-white">電影分類</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/movieweb-frontend/watchlist" class="nav-link text-white">(會員)待觀看電影</router-link>
        </li>
        <li class="nav-item">
            <logout class="nav-link text-white"/>
        </li>
    </ul>

    <div class="dropdown shownavbutton">
    <button type="button" class="btn dropdown-toggle navbutton" data-bs-toggle="dropdown">
      &#9776;
    </button>
    <ul class="dropdown-menu">
        <li>
            <router-link to="/" class="dropdown-item ">首頁</router-link>
        </li>
        <li>
            <router-link to="/nowplaying"  class="dropdown-item ">上映電影</router-link>
        </li>
        <li>
            <router-link to="/popular" class="dropdown-item ">熱門電影</router-link>
        </li>
        <li>
            <router-link to="/upcoming" class="dropdown-item ">即將上映電影</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/genre" class="dropdown-item">電影分類</router-link>
        </li>
        <li>
            <router-link to="/watchlist" class="dropdown-item ">(會員)待觀看電影</router-link>
        </li>
        <li>
            <logout class="dropdown-item "/>
        </li>
    </ul>
  </div>


    </div>
</div>
</div>

</template>

<script>
import logoImage from '../assets/images/logo.jpg';

export default {
    setup() {
        return{
            logoImage
        }
    }
}
</script>