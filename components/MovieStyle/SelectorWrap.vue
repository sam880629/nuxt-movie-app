<template>
  <div class="px-5 w-full bg-[#211c1e] pt-5 flex  items-center">
    <h1 class="text-white text-2xl font-bold mr-5">熱門電影</h1>
    <div
      class="flex flex-row justify-between items-center border rounded-3xl box-border w-fit"
    >
      <!-- day -->
      <div
        @click="selectOption('day')"
        class="select_btn"
        :class="{ 'select': selectedOption == 'day' }"
      >
        Day
      </div>
      <!-- week -->
      <div
        @click="selectOption('week')"
        class="select_btn"
        :class="{ 'select': selectedOption == 'week' }"
      >
        Week
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const selectedOption= ref<string>("day");

const emit = defineEmits(["optionSelected"]);

const selectOption = (option: string) => {
  if (selectedOption.value == option) {
    return;
  }
  selectedOption.value = option;
  emit("optionSelected", option);
};
</script>

<style>
@import "/asset/css/MovieStyle\SelectorWrap.scss";
</style>
