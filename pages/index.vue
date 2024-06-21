<template>
  <SelectorWrap @optionSelected="handleOptionSelection" />
  <MovieList v-if="movies.length > 0" :movies="movies" />
  <div v-else class="bg-[#211c1e] h-[520px]"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPopularMovies } from "../utils/TmdbApi";
import MovieList from "~/components/MovieList.vue";
import SelectorWrap from "~/components/MovieStyle/SelectorWrap.vue";
import type { MovieType } from "../types/movie";

const movies = ref<MovieType[]>([]); //API資料
const option = ref<string>("day");
const page = ref<number>(0);
const isLoading = ref<boolean>(false); //防止多次觸發

// 監聽切換day/week 趨勢資料按鈕
const handleOptionSelection = async (selectedOption: string) => {
  option.value = selectedOption;
  movies.value = [];
  page.value= 1;
  try {
    movies.value = await getPopularMovies(option.value, page.value);
  } catch (error) {
    console.error("error:", error);
  }
};

const loadMoreMovies = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  page.value++;
  if (page.value == 5) return;
  try {
    const newMovies = await getPopularMovies(option.value, page.value);
    movies.value = [...movies.value, ...newMovies];
  } catch (error) {
    console.error("Error fetching more movies:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadMoreMovies();
  window.addEventListener("scroll", function() {
    // 檢查是否到底部
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreMovies();
    }
  });
});
</script>

<style></style>
