<!-- 首頁-熱門電影 -->
<template>
  <SelectorWrap @optionSelected="handleOptionSelection" />
  <MovieList :movies="movies" />
</template>
<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import MovieList from "~/components/MovieList.vue";
import SelectorWrap from "~/components/MovieStyle/SelectorWrap.vue";
import { getPopularMovies } from "~/server/api/TmdbApi";
import type { MovieType } from "~/types/movie";


const movies = ref<MovieType[]>([]);//API資料


// 監聽切換day/week 趨勢資料按鈕
const handleOptionSelection = async (option: string) => {
  try {
    movies.value = await getPopularMovies(option);
  } catch (error) {
    console.error("error:", error);
  }
};

onMounted(async () => {
  try {
    movies.value = await getPopularMovies("day");
  } catch (error) {
    console.error("error:", error);
  }
});
</script>

<style lang="scss"></style>
