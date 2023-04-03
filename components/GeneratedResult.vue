<script setup lang="ts">
export interface Props {
  prompt: string;
}
defineProps<Props>();
</script>
<template>
  <div v-if="prompt">
    <div class="flex justify-center">
      <div
        class="border-4 border-slate-600 rounded-3xl text-primary-content px-8 max-w-full pb-6">
        <code class="indent-8">
          <div v-html="prompt"></div>
        </code>
      </div>
    </div>
  </div>
</template>
