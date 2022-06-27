<script setup lang="ts">
export interface KanjiProps {
  moji: string;
};

const props = defineProps<KanjiProps>();
</script>

<template>
  <div class="card-face">
    <h2><span class="sr-only">The kanji is </span><span lang="jp">{{moji}}</span></h2>
    
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.card {
  display: block;
  height: 90vh;
  aspect-ratio: 5 / 7;
  background-color: ivory;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

</style>
