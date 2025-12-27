<template>
  <div
    class="show-card max-w-full flex gap-10 lg:gap-5 z-50 flex-col lg:flex-row items-center justify-start lg:justify-center overflow-auto w-9/12 min-h-[510px] h-4/6 md:h-5/6 lg:p-8 lg:pr-0 relative"
  >
    <!-- Left Arrow -->
    <div
      v-if="isShowingActors"
      @click="togglePage"
      class="text-white hidden lg:flex w-[38px] cursor-pointer"
    >
      <img :src="pageBtnIcon" alt="Previous" />
    </div>

    <!-- Movie Poster -->
    <div class="w-8/12 lg:w-6/12 max-w-80 flex lg:flex-col mt-10 lg:mt-0">
      <img class="rounded-xl" :src="movieData.poster_path" :alt="movieData.title" />
    </div>

    <!-- Movie Info -->
    <div
      class="flex flex-col w-9/12 items-start lg:h-full"
      :class="{ 'lg:hidden': isShowingActors }"
    >
      <div class="flex gap-10 w-full">
        <div class="flex-1">
          <p class="card-title text-[#efefef] font-bold text-2xl mb-1">
            {{ movieData.title }}
          </p>

          <p class="card-original_title text-[#efefef] mb-2 text-sm">
            {{ movieData.original_title }}
          </p>

          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="genre in moviesDetails?.genres"
              :key="genre.id"
              class="px-2 py-0.5 bg-white border rounded-xl font-bold text-xs"
            >
              {{ genre.name }}
            </span>
          </div>

          <p class="card-release_date text-[#efefef] mb-2">
            上映日期: {{ movieData.release_date }}
          </p>

          <p class="card-overview text-[#efefef] mt-4 mb-2 line-clamp-4 lg:line-clamp-none">
            {{ movieData.overview }}
          </p>
        </div>

        <!-- Director -->
        <div
          v-if="directorInfo"
          class="text-[#efefef] card-director w-fit flex flex-col items-center"
        >
          <p class="font-bold text-2xl mb-2">Director</p>
          <img
            class="circle w-20 h-20 object-cover rounded-full mb-2"
            :src="directorInfo.profile_path"
            :alt="directorInfo.name"
          />
          <p class="bg-black rounded-xl px-2 py-1 font-bold text-sm">
            {{ directorInfo.name }}
          </p>
        </div>
      </div>

      <!-- Trailer -->
      <div class="movieBox w-full h-[300px] lg:h-full mb-3 mt-4">
        <iframe
          v-if="videoKey"
          class="w-full h-full rounded-lg"
          :src="`https://www.youtube.com/embed/${videoKey}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- Right Arrow -->
    <div
      v-if="!isShowingActors"
      @click="togglePage"
      class="text-white hidden lg:flex lg:mr-2 cursor-pointer"
    >
      <img :src="pageBtnIcon" alt="Next" class="w-[36px]" />
    </div>

    <!-- Actors Section -->
    <div
      class="flex flex-col items-center w-full h-full lg:justify-start overflow-y-auto custom-scrollbar"
      :class="{ 'lg:hidden': !isShowingActors }"
    >
      <p class="text-[#efefef] text-3xl font-bold my-8 text-center tracking-wider actors-title">
        主要演員 <span class="text-yellow-500">Cast</span>
      </p>
      <div
        class="ActorsCard text-[#efefef] grid grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-10 w-full max-w-4xl"
      >
        <ActorsCard 
          v-for="(actor, index) in actorsList" 
          :key="actor.id" 
          :actor="actor"
          class="actor-item"
          :style="{ animationDelay: `${index * 0.1}s` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import ActorsCard from "~/components/MovieStyle/ActorsCard.vue";
import type { PropType } from "vue";
import type { MovieType } from "~/types/movie";
import { getMoviesDetails, getMovieVideos, getCredits } from "~/utils/TmdbApi";

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

const isShowingActors = ref(false);

// 使用 Vue Query 管理電影詳情
const { data: moviesDetails } = useQuery({
  queryKey: ["movieDetails", props.movieData.id],
  queryFn: () => getMoviesDetails(props.movieData.id),
});

// 使用 Vue Query 管理預告片
const { data: videoKey } = useQuery({
  queryKey: ["movieVideo", props.movieData.id],
  queryFn: () => getMovieVideos(props.movieData.id),
});

// 使用 Vue Query 管理演員與導演資訊
const { data: moviesCredits } = useQuery({
  queryKey: ["movieCredits", props.movieData.id],
  queryFn: () => getCredits(props.movieData.id),
  initialData: { actors: [], director: null as any },
});

const actorsList = computed(() => moviesCredits.value?.actors || []);
const directorInfo = computed(() => moviesCredits.value?.director || null);

const pageBtnIcon = computed(() => 
  isShowingActors.value ? "/image/left-arrow.png" : "/image/right-arrow.png"
);

const togglePage = () => {
  isShowingActors.value = !isShowingActors.value;
};
</script>

<style lang="scss">
@import "/assets/css/MovieStyle/showCard.scss";
</style>
