<template>
  <div class="relative">
    <!-- 背景圖片 -->
    <img
      class="z-1 absolute w-full h-full top-0 left-0 object-cover"
      src="/image/home_background.jpg"
    />
    <!-- 標題 -->
    <div class="flex flex-col gap-10 items-start md:items-center">
      <div
        class="pt-10 px-5 text-white font-bold relative z-10 flex flex-col gap-3"
      >
        <nuxt-link to="/">
          <p class="md:text-center text-3xl">CinemaHub</p>
        </nuxt-link>
        <p class="text-lg text-[#efefef] opacity-85">
          Your Ultimate Movie Destination
        </p>
      </div>
      <!-- 搜尋框 -->
      <div
        class="px-5 mb-10 text-[#efefef] z-10 w-full md:w-8/12 lg:w-6/12 relative"
      >
        <span class="absolute top-1/2 left-2 translate-y-[-50%] px-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              stroke="#737373"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.333"
              d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
            ></path>
          </svg>
        </span>
        <input
          class="border-[#4e484a] rounded-md textInput h-[50px] bg-[#353132] text-sm md:text-lg pl-8 py-[12px] w-full outline-none"
          type="text"
          placeholder="Search for movies..."
          v-model="searchVal"
          @input="search"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { useRouter } from "vue-router";

const searchVal = ref<string>("");

const router = useRouter();
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
const search = debounce(() => {
  if (searchVal.value!='') {
    // console.log(searchVal.value)
    router.push({ path: "/search", query: { name: searchVal.value } });
  }else{
    router.push({ path: "/" });
  }
}, 800);
</script>

<style lang="scss">
@import "assets/css/AppHeader.scss";
</style>
