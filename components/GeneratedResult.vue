<script setup lang="ts">
import Typed from "typed.js";

export interface Props {
  prompt: string;
}
const props = defineProps<Props>();

const typing = ref(null);
const typedInstance = ref();

onMounted(() => {
  typedInstance.value = new Typed(typing.value, {
    strings: [props.prompt] || ["Waiting for AI generated response..."],
    typeSpeed: 100,
    showCursor: true,
  });
});
onBeforeUnmount(() => {
  typedInstance.value?.destroy();
});
</script>
<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        class="bg-green-950 rounded-3xl text-primary-content mt-6 p-4 indicator max-w-full">
        <code class="py-6 indent-8">
          <span ref="typing" class="text-white"></span>
        </code>
      </div>
    </div>
  </div>
</template>
