<script setup lang="ts">
import { GenerateApiResponse } from "~~/types/interface";

const isLoading = ref(false);
const fetchedPrompt = ref("");
const isEmpty = ref(false);
const submit = async (prompt: string) => {
  if (!prompt) {
    isEmpty.value = true;
  }
  if (prompt) {
    isLoading.value = true;
    try {
      const response = await useLazyFetch("/api/generate", {
        method: "post",
        body: {
          prompt,
        },
      });
      fetchedPrompt.value = response.data.value;
      isLoading.value = false;
      isEmpty.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  }
};
</script>
<template>
  <div class="container mx-auto pb-36">
    <div class="flex justify-center">
      <div class="max-w-2xl">
        <div class="mockup-code text-primary-content mt-6">
          <code>
            <p
              class="p-6 indent-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              Did you come across a news article that seems too good (or bad) to
              be true? Are you unsure about its authenticity? Simply copy and
              paste the news into FactCheckAI's smart text area below, and let
              our advanced AI technology verify its accuracy for you. It's that
              simple!
            </p>
          </code>
        </div>
        <TextArea
          class="mt-6"
          :is-loading="isLoading"
          :is-empty="isEmpty"
          @change:text="submit" />
        <GeneratedResult ref="promptArea" :prompt="fetchedPrompt" />
      </div>
    </div>
  </div>
</template>
