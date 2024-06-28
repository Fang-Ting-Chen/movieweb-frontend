<template>
<div class="bg-header p-3 ">
<div class="container ">
    <div class="d-flex  ">
        <img :src="logoImage" alt="logo" class="logoimg ">   
        <div class="align-content-center">
            <img :src="tmdbLogo" alt="logo" class="tmdblogo ">   
            <small class="text-white">  This [website, program, service, application, product] uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</small>
        </div>
    </div>
</div>
</div>

</template>

<script>
import logoImage from '../assets/images/logo.jpg';
import tmdbLogo from '../assets/images/tmdb.svg'

export default {
    setup() {
        return{
            logoImage,
            tmdbLogo
        }
    }
}
</script>