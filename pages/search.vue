<!-- 搜尋頁 -->
<template>
  <div
    v-if="isLoading"
    class="h-[520px] bg-[#211c1e] text-white flex justify-center items-center flex-col"
  >
    <!-- loading -->
    <div class="la-ball-clip-rotate la-2x">
      <div></div>
    </div>
    <p>loading.....</p>
  </div>
  <MovieList
    v-else-if="movies && movies.length > 0"
    :movies="movies"
    :searchQuery="searchQuery"
  />
  <div
    v-else
    class="h-[520px] bg-[#211c1e] text-white flex justify-center items-center text-3xl"
  >
    <!-- 查無資料 -->
    <p>很抱歉!查無相關資料</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import MovieList from "../components/MovieList.vue";
import { getMovies } from "~/utils/TmdbApi";

const route = useRoute();
const searchQuery = computed(() => (route.query.name as string) || "");

// 使用 Vue Query 管理搜尋結果
const { data: movies, isLoading } = useQuery({
  queryKey: ["searchMovies", searchQuery],
  queryFn: () => getMovies(searchQuery.value),
  enabled: computed(() => !!searchQuery.value), // 只有在有搜尋關鍵字時才執行
});
</script>
<style lang="scss">
@import "/assets/css/pages/search.scss";
</style>
