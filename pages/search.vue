<!-- 搜尋頁 -->
<template>
  <div
    v-if="loading"
    class="h-[520px] bg-[#211c1e] text-white flex justify-center items-center flex-col"
  >
    <!-- loading -->
    <div class="la-ball-clip-rotate la-2x">
      <div></div>
    </div>
    <p>loading.....</p>
  </div>
  <MovieList
    v-if="movies.length > 0 && !loading"
    :movies="movies"
    :searchQuery="searchQuery"
  />
  <div v-else-if="!loading" class="h-[520px] bg-[#211c1e] text-white flex justify-center items-center text-3xl">
    <!-- 查無資料 -->
    <p>很抱歉!查無相關資料</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import MovieList from "../components/MovieList.vue";
import { getMovies } from "../server/api/TmdbApi";
import type { MovieType } from "../types/movie";

const route = useRoute();
const searchQuery = ref<any>(route.query.name || "");
const movies = ref<MovieType[]>([]);
const loading = ref<boolean>(true); //加載狀態


// 監聽url上的參數
watchEffect(async () => {
  searchQuery.value = route.query.name || " ";
  const startTime = Date.now();
  loading.value = true;
  if(route.query.name==''){
    console.log("null")
  }
  if (searchQuery.value) {
    try {
      // console.log(searchQuery.value)
      movies.value = await getMovies(searchQuery.value);
    } catch (error) {
      console.log("error:" + error);
    } finally {
      const findshTime = Date.now() - startTime;
      const minTime = 1200;//讀取時間
      if (findshTime < minTime) {
        setTimeout(() => {
          loading.value = false;
        }, minTime - findshTime);
      } else {
        loading.value = false;
      }
    }
  } else {
    loading.value = false;
  }
});
</script>
<style lang="scss">
@import "assets/css/pages/search.scss";
</style>
