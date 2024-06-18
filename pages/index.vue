<!-- 首頁-熱門電影 -->
<template>
  <SelectorWrap @optionSelected="handleOptionSelection" />
  <MovieList :movies="movies" />
</template>
<script setup lang="ts">
import { ref, onMounted} from "vue";
// import { getPopularMovies,getMovies } from "../server/api/TmdbApi";
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
const getPopularMovies = async (option: string) => {
  const API_KEY = "21595016d5497b10530c6a5162f7e9c2";
  console.log("option:  "+option);
  const url = `https://api.themoviedb.org/3/trending/movie/${option}?api_key=${API_KEY}&language=zh-TW&page=1`;
  console.log("url:  "+url);
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
    console.log("Error fetching popular movies:" + error);
    return [];
  }
}
onMounted(async () => {
  console.log("onMounted called");
  try {
    console.log("getPopularMovies call~~~");
    // movies.value =await getMovies("沙丘");
    movies.value = await getPopularMovies("day");
    console.log("getPopularMovies called");
  } catch (error) {
    console.error("Error fetching popular movies on mount:", error);
  }
});
</script>

<style lang="scss"></style>
