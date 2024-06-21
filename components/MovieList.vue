<template>
  <div class="box bg-[#211c1e] h-full relative">
    <div
      class="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <MovieCard v-for="(movie, index) in movies" :key="movie.id" :movie="movie" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "~/components/MovieStyle/MovieCard.vue";
import type { MovieType } from "~/types/movie";
import type { PropType } from "vue";

const props = defineProps({
  movies: {
    type: Array as PropType<MovieType[]>,
    required: true,
  }
});

onMounted(() => {
  // const cards = document.querySelectorAll(".movie-card");
  // cards.forEach((card, index) => {
  //   (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
  // });
});

</script>

<style></style>
