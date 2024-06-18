<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

useHead({
  title: "CinemaHub",
  link: [
  { rel: 'CinemaHub icon', href: 'Logo.ico' },
],
});

</script>
<style>
html {
    overflow: auto;
}
.body{
   position: absolute;
    top: 10px;
    left: 20px;
    bottom: 10px;
    right: 0;
    padding: 30px; 
    overflow-y: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 10px;
}
 
::-webkit-scrollbar-track {
    background-color: #ebebeb;
    -webkit-border-radius: 10px;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #6d6d6d; 
}
</style>