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
import type { MovieType } from "../types/movie";

const route = useRoute();
const searchQuery = ref<any>(route.query.name || "");
const movies = ref<MovieType[]>([]);
const loading = ref<boolean>(true); //加載狀態
// 搜尋電影資料
const getMovies = async (query: string) => {
  const API_KEY = "21595016d5497b10530c6a5162f7e9c2";
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=zh-TW&page=1&query=${query}`;
  // console.log(url);
  try {
    const response = await fetch(url, { method: "GET" }).then((res) =>
      res.json()
    );
    const data = response.results.map((val: any) => ({
      ...val,
      poster_path: val.poster_path
        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + val.poster_path
        : "/image/movie_image.jpg",
      backdrop_path: val.backdrop_path
        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + val.backdrop_path
        : "/image/movie_image.jpg",
    }));

    return data;
  } catch (error) {
    console.log("err:" + error);
    return [];
  }
};
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
@import "/assets/css/pages/search.scss";
</style>
