<template>
  <div class="actor-card group relative overflow-hidden rounded-xl bg-[#2a2627] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
    <div class="aspect-[2/3] overflow-hidden">
      <img
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        :src="actor.profile_path"
        :alt="actor.name"
      />
    </div>
    <div class="p-3 text-center">
      <p class="text-sm lg:text-base font-bold text-[#efefef] truncate group-hover:text-yellow-500 transition-colors">
        {{ actor.name }}
      </p>
      <p class="text-xs text-gray-400 truncate mt-1">
        {{ actor.character }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ActorType } from "~/types/movie";

defineProps({
  actor: {
    type: Object as PropType<ActorType>,
    required: true,
  },
});
</script>
<style lang="scss"></style>
