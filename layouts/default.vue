<script setup lang="ts">
const footerRef: Ref<TheFooter | null> = ref(null);

const scrollToDiv = () => {
  footerRef.value?.$el.scrollIntoView({ behavior: "smooth" });
};
</script>
<template>
  <div>
    <TheNavbar />
    <TheHero @scroll:div="scrollToDiv" />
    <NuxtPage />
    <TheFooter ref="footerRef" />
  </div>
</template>
