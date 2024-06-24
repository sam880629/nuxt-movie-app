<template>
  <div class="box bg-[#211c1e] h-full relative">
    <div
      class="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <MovieCard v-for="(movie, index) in movies" :key="movie.id" :movie="movie" :index="index" />
    </div>
    <button  v-show="showScrollTop" @click="scrollToTop" class="scroll-to-top  ">↑</button>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "~/components/MovieStyle/MovieCard.vue";
import type { MovieType } from "~/types/movie";
import type { PropType } from "vue";

const showScrollTop = ref<boolean>(false);
const props = defineProps({
  movies: {
    type: Array as PropType<MovieType[]>,
    required: true,
  }
});
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
onMounted(async () => {
    window.addEventListener('scroll', handleScroll);
});

</script>

<style lang="scss">
@import "/assets/css/MovieList.scss";
</style>
