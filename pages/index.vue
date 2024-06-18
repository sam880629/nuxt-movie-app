<!-- 首頁-熱門電影 -->
<template>
  <SelectorWrap @optionSelected="handleOptionSelection" />
  <MovieList :movies="movies" />
</template>
<script setup lang="ts">
import { ref, onMounted} from "vue";
import { getPopularMovies } from "~/server/api/TmdbApi";
import MovieList from "~/components/MovieList.vue";
import SelectorWrap from "~/components/MovieStyle/SelectorWrap.vue";
import type { MovieType } from "../types/movie";

const movies = ref<MovieType[]>([]);//API資料

// 監聽切換day/week 趨勢資料按鈕
const handleOptionSelection = async (option: string) => {
  console.log("change")
  try {
    movies.value = await getPopularMovies(option);
    console.log(movies.value);
  } catch (error) {
    console.error("error:", error);
  }
};

onMounted(async () => {
  console.log("onMounted called");
  try {
    console.log("getPopularMovies call~~~");
    movies.value = await getPopularMovies("day");
  } catch (error) {
    console.error("Error fetching popular movies on mount:", error);
  }
});
</script>

<style lang="scss"></style>
