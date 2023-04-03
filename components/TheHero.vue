<script setup lang="ts">
import Typed from "typed.js";

const typing = ref(null);
const typedInstance = ref();

const emit = defineEmits<{
  (e: "scroll:div"): void;
}>();
const scrollToDiv = () => {
  emit("scroll:div");
};
onMounted(() => {
  typedInstance.value = new Typed(typing.value, {
    strings: [
      "With our powerful AI interface you can now easily verify the authenticity of any news or article. Whether you're a journalist, student, or simply a concerned citizen, FactCheckAI can help you make informed decisions based on accurate information.",
    ],
    typeSpeed: 50,
    showCursor: true,
  });
});
onBeforeUnmount(() => {
  typedInstance.value?.destroy();
});
</script>
<template>
  <div class="hero min-h-fit bg-base-200 pt-36">
    <div class="hero-content text-center">
      <div class="max-w-2xl">
        <span class="text-5xl font-bold">
          <Icon
            name="material-symbols:fact-check-outline"
            size="58"
            class="inline-block align-sub mr-2" />FactCheckAI
          <p
            class="text-4xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mt-3">
            Separating fact from
            <span class="line-through decoration-pink-500">fiction</span> with
            AI
          </p>
        </span>
        <p class="py-6 text-2xl">
          <span ref="typing"></span>
        </p>
        <button
          class="btn bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 btn-wide mt-4"
          @click="scrollToDiv">
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>
