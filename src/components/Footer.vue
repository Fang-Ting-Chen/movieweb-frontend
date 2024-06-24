<template>
<div class="bg-header p-3 ">
<div class="container ">
    <div class="d-flex  ">
        <img :src="logoImage" alt="logo" class="logoimg ">   
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