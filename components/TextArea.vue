<script setup lang="ts">
export interface Props {
  isLoading: boolean;
}

defineProps<Props>();

const userPrompt = ref("");
const isEmpty = ref(false);
const emit = defineEmits<{
  (e: "change:text", value: string): void;
  (e: "error:empty", value: boolean): void;
}>();
const verifyText = () => {
  if (!userPrompt.value) {
    isEmpty.value = true;
  }
  emit("change:text", userPrompt?.value);
  emit("error:empty", isEmpty?.value);
};
</script>
<template>
  <textarea
    v-model.trim="userPrompt"
    placeholder="Paste your article here..."
    class="textarea textarea-primary mt-3 textarea-lg w-full max-w-full"
    :class="{ 'textarea-error': isEmpty }"></textarea>
  <p v-if="isEmpty" class="mt-3 text-center">
    Please paste your content into the box above. Don't leave it empty!
  </p>
  <div class="mt-6 text-center">
    <button
      class="btn bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 btn-wide"
      :class="{ loading: isLoading }"
      @click="verifyText">
      Verify
    </button>
  </div>
</template>
