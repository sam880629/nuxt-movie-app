<template>
  <SelectorWrap @optionSelected="handleOptionSelection" />
  <MovieList v-if="allMovies.length > 0" :movies="allMovies" />
  <div v-else-if="isLoading" class="flex justify-center items-center h-[520px] bg-[#211c1e]">
    <p class="text-white">載入中...</p>
  </div>
  <div v-else class="bg-[#211c1e] h-[520px]"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { getPopularMovies } from "../utils/TmdbApi";
import MovieList from "~/components/MovieList.vue";
import SelectorWrap from "~/components/MovieStyle/SelectorWrap.vue";

const option = ref<string>("day");

// 使用 useInfiniteQuery 管理分頁資料
const {
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ["popularMovies", option],
  queryFn: ({ pageParam = 1 }) => getPopularMovies(option.value, pageParam),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    // 限制最多加載 5 頁
    if (allPages.length >= 5) return undefined;
    return allPages.length + 1;
  },
});

// 將巢狀的分頁資料扁平化
const allMovies = computed(() => {
  return data.value?.pages.flat() || [];
});

// 監聽切換 day/week 趨勢資料按鈕
const handleOptionSelection = (selectedOption: string) => {
  option.value = selectedOption;
};

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    if (hasNextPage.value && !isFetchingNextPage.value) {
      fetchNextPage();
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
