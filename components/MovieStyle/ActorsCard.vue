<template>
  <div class="h-4/6 w-11/12">
    <img
      class="rounded-t-xl  lg:h-[200px] w-full object-cover"
      :src="Actor.profile_path"
      alt=""
    />
    <p class="rounded-b-xl bg-black text-center text-lg  font-bold ">{{ Actor.name }}</p>
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
