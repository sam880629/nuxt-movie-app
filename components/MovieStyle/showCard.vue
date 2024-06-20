<template>
  <div
    class="show-card max-w-full flex gap-20 lg-gap-10 lg:gap-5 z-50 flex-col lg:flex-row items-center justify-start lg:justify-center overflow-auto w-9/12 min-h-[510px] h-4/6 md:h-5/6 p-8 pr-0 "
  >
    <!--left-arrow  -->
    <div
      v-if="pageState"
      @click="ChangePage"
      class="text-white hidden lg:flex w-[38px]"
    >
      <img :src="pageBtn" alt="" class="" />
    </div>
    <!-- 海報 -->
    <div class="w-8/12 lg:w-6/12 max-w-80 flex lg:flex-col">
      <img class="rounded-xl" :src="movieData.poster_path" alt="" />
    </div>

    <div
      class="flex flex-col w-9/12 items-start h-full"
      :class="{ 'lg:hidden': pageState }"
    >
      <div class="flex gap-10">
        <div class="flex-1">
          <!-- 標題 -->
          <p class="card-title text-[#efefef] font-bold text-2xl mb-1">
            {{ movieData.title }}
          </p>

          <!-- 英文標題 -->
          <p class="card-original_title text-[#efefef] mb-2 text-sm">
            {{ movieData.original_title }}
          </p>
          <!-- 分類 -->
          <div class="flex  flex-wrap">
            <p
              class="mr-2 p-0.5 bg-white border rounded-xl font-bold mb-2"
              v-for="genre in moviesDetails.genres"
            >
              {{ genre.name }}
            </p>
          </div>
          <!-- 上映日期 -->
          <p class="card-release_date text-[#efefef] mb-2">
            上映日期:{{ movieData.release_date }}
          </p>
          <!-- 介紹 -->
          <p class="card-overview text-[#efefef] mt-4 mb-2">
            {{ movieData.overview }}
          </p>
        </div>
        <!-- 導演 -->
        <div
          class="text-[#efefef] card-director w-fit flex justify-center flex-col items-center"
        >
          <p class="text-[#efefef] font-bold text-2xl">Director</p>
          <img
            class="circle"
            :src="moviesCredits.director.profile_path"
            alt=""
          />
          <p class="bg-black rounded-xl p-1 font-bold">
            {{ moviesCredits.director.name }}
          </p>
        </div>
      </div>

      <!-- 預告片 -->
      <div class="movieBox  w-full h-[520px] lg:h-full mb-3"></div>
    </div>
    <!--right-arrow  -->
    <div
      v-if="!pageState"
      @click="ChangePage"
      class="text-white hidden lg:flex lg:mr-2"
    >
      <img :src="pageBtn" alt="" class="w-[36px]" />
    </div>
    <!-- 演員區塊 -->
    <div
      class="flex flex-col items-center w-full h-full lg:justify-start"
      :class="{ 'lg:hidden': !pageState }"
    >
      <p class="text-[#efefef] text-2xl font-bold m-5 text-center ">主要演員</p>
      <div
        class="ActorsCard text-[#efefef] grid grid-cols-2 xl:grid-cols-3 gap-2 justify-center items-center lg:items-start w-9/12"
      >
        <ActorsCard v-for="Actor in moviesCredits.actors" :Actor="Actor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ActorsCard from "~/components/MovieStyle/ActorsCard.vue";
import type { PropType } from "vue";
import type { MovieType, MovieDetailsType, CreditsType } from "~/types/movie";
import { getMoviesDetails, getMovieVideos, getCredits } from "~/utils/TmdbApi";

const moviesDetails = ref<MovieDetailsType | any>([]);
const moviesCredits = ref<CreditsType | any>({ actors: [], director: [] });
const pageState = ref<Boolean>(false);
let pageBtn = ref<string>("/image/right-arrow.png");
const props = defineProps({
  showCardState: {
    type: Boolean,
    required: true,
  },
  movieData: {
    type: Object as PropType<MovieType>,
    required: true,
  },
});

const ChangePage = () => {
  pageState.value = !pageState.value;
  pageBtn.value = pageState.value
    ? "/image/left-arrow.png"
    : "/image/right-arrow.png";
};

onMounted(async () => {
  try {
    moviesDetails.value = await getMoviesDetails(props.movieData.id);
    getMovieVideos(props.movieData.id);
    moviesCredits.value = await getCredits(props.movieData.id);
  } catch (error) {
    console.error("error:", error);
  }
});
</script>

<style lang="scss">
@import "/assets/css/MovieStyle/showCard.scss";
</style>
