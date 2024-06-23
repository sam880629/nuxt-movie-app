<template>
  <div
    class="movie-card w-auto bg-[#353132] border-[#4e484a] border rounded-xl cursor-pointer h-full"
    @click="toggleShowCard"
    :data-id="movie.id"
  >
    <div class="py-4 pl-8 flex flex-col lg:pl-6 relative">
      <div class="pr-4 text-[#efefef] flex gap-2 justify-between items-center">
        <!-- 電影標題 -->
        <p
          class="py-2 px-4 bg-[#272425] truncate text-[#efefef] rounded-3xl max-w-fit text-xl lg:text-base font-bold"
        >
          {{ movie.title }}
        </p>
        <!-- 電影評分 -->
        <p
          class="font-mono p-4 w-[40px] h-[40px] font-bold rounded-[50%] bg-white text-[#272425] flex justify-center items-center"
        >
          {{ voteNumber }}
        </p>
      </div>
      <div
        class="mt-4 mb-20 sm:mb-10 lg:mb-6 sm:w-70 md:w-70 lg:w-90 w-5/6 relative"
      >
        <!-- 海報圖 -->
        <img
          class="poster_img rounded-xl"
          :src="movie.poster_path"
          alt="poster_img"
        />
        <!-- 背景圖 -->
        <img
          class="backdrop_img rounded-xl"
          :src="movie.backdrop_path"
          alt="backdrop_img"
        />
      </div>
      <div
        v-if="showCardState"
        class="fixed inset-0 bg-black bg-opacity-60 z-40"
      ></div>
    </div>

    <!-- 詳細內容 -->
    <showCard
      :movieData="movie"
      :showCardState="showCardState"
      v-if="showCardState"
      @click.stop
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import showCard from "~/components/MovieStyle/showCard.vue";
import type { MovieType } from "~/types/movie";

const props = defineProps({
  movie: {
    type: Object as PropType<MovieType>,
    required: true,
  },
});

const showCardState = ref<boolean>(false);
// 開關閉彈出視窗
const toggleShowCard = () => {
  showCardState.value = !showCardState.value;
};
const voteNumber = ref<number>(Number(props.movie.vote_average.toFixed(1)));
</script>

<style>
@import "/assets/css/MovieStyle/MovieCard.scss";
</style>
