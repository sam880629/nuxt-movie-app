<template>
  <div class="h-fit  lg:w-8/12 w-6/12">
    <img
      class="rounded-t-xl "
      :src="Actor.profile_path"
      alt=""
    />

    <p class="rounded-b-xl bg-black text-center text-lg  font-bold">{{ Actor.name }}</p>
    <p class="text-center text-sm">{{ Actor.character }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PropType } from "vue";
import type { ActorsType } from "~/types/movie";

const props = defineProps({
  Actor: {
    type: Object as PropType<ActorsType>,
    required: true,
  },
});

</script>
<style lang="scss"></style>
