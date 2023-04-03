<script setup lang="ts">
export interface Props {
  isLoading: boolean;
  isEmpty: boolean;
}

defineProps<Props>();

const userPrompt = ref("");
const emit = defineEmits<{
  (e: "change:text", value: string): void;
}>();
const verifyText = () => {
  emit("change:text", userPrompt?.value);
};
</script>
<template>
  <div>
    <textarea
      v-model.trim="userPrompt"
      placeholder="Paste your content here to verify..."
      class="textarea textarea-primary mt-3 textarea-lg w-full max-w-full border-4"
      :class="{ 'textarea-error': isEmpty }"></textarea>
    <p v-if="isEmpty" class="mt-3 text-center">
      Please paste your content into the box above. Don't leave it empty!
    </p>
    <div class="my-6 text-center">
      <button
        class="btn bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 btn-wide"
        :class="{ loading: isLoading }"
        @click="verifyText">
        Verify
      </button>
    </div>
  </div>
</template>
