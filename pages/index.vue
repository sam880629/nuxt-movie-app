<!-- 首頁-熱門電影 -->
<template>
  <SelectorWrap @optionSelected="handleOptionSelection" />
  <MovieList v-if="movies.length>0" :movies="movies" />
  <div v-else class="bg-[#211c1e] h-[520px]"></div>
</template>
<script setup lang="ts">
import { ref, onMounted} from "vue";
import {getPopularMovies} from "../utils/TmdbApi";
import MovieList from "~/components/MovieList.vue";
import SelectorWrap from "~/components/MovieStyle/SelectorWrap.vue";
import type { MovieType } from "../types/movie";

const movies = ref<MovieType[]>([]);//API資料

// 監聽切換day/week 趨勢資料按鈕
const handleOptionSelection = async (option: string) => {
  console.log("change")
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
    console.error("Error fetching popular movies on mount:", error);
  }
});
</script>

<style lang="scss"></style>
