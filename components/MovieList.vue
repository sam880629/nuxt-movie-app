<template>
  <div class="box bg-[#211c1e] h-full">
    <div
      class="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <MovieCard
        v-for="(movie, index) in movies"
        :key="movie.id"
        :index="index"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted,watch } from "vue";
import MovieCard from "~/components/MovieStyle/MovieCard.vue";
import type { MovieType } from "~/types/movie";
import type { PropType } from "vue";

const props = defineProps({
  movies: {
    type: Array as PropType<MovieType[]>,
    required: true,
  },
});

// watch(() => props.movies, (newMovies) => {
//   const cards = document.querySelectorAll(".movie-card");
//   cards.forEach((card, index) => {
//     (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
//   });
// });

// onMounted(async () => {
//   const cards = document.querySelectorAll(".movie-card");
//   cards.forEach((card, index) => {
//     (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
//   });
// });

</script>

<style></style>
