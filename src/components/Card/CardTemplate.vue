<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import type { Ref } from "vue";

export interface CardTemplateProps {
  index: string;
  currentCardIndex: string;
}

export interface CardTemplateState {
  currentFace: "front" | "back";
}

const props = defineProps<CardTemplateProps>();

const frontFace = ref<HTMLElement | null>(null);
const backFace = ref<HTMLElement | null>(null);
const faceRefs: {[key: string]: Ref<HTMLElement | null> } = {
  front: frontFace,
  back: backFace,
};

const state: CardTemplateState = reactive({
  currentFace: "front",
});

const cardClasses = [
  "card",
  props.index === props.currentCardIndex ? "card--active" : null,
].join(" ");

const toggleCardFace = async (): Promise<void> => {
  if (faceRefs[state.currentFace].value) {
    faceRefs[state.currentFace].value?.classList.remove("card-face--focused");
  }
  state.currentFace = state.currentFace === "front" ? "back" : "front";
  if (faceRefs[state.currentFace].value) {
    await nextTick();
    faceRefs[state.currentFace].value?.classList.add('card-face--focused');
    console.log('should focus', faceRefs[state.currentFace].value)
    faceRefs[state.currentFace].value?.focus();
  }
};

onMounted(() => {
  if (frontFace.value) {
    frontFace.value?.focus();
    frontFace.value.classList.add("card-face--focused");
    console.log("afterfocused: ", document.activeElement);
  }
});
</script>

<template>
  <article
    :class="cardClasses"
    aria-live="polite"
    aria-role="tab-list"
    :id="props.index"
  >
    <section
      class="card-face card-face--front"
      tabindex="0"
      aria-role="tab"
      ref="frontFace"
    >
      <slot name="front" />
      <button
        class="card-toggle sr-only"
        ref="cardBackToggle"
        @click="toggleCardFace"
      >
        Read back of card
      </button>
      <a v-if="parseInt(props.index, 10) > 2" href="#0">
        Return to first card
      </a>
    </section>
    <section
      class="card-face card-face--back"
      tabindex="0"
      aria-role="tab"
      ref="backFace"
    >
      <slot name="back" />
      <button
        class="card-toggle sr-only"
        ref="cardFrontToggle"
        @click="toggleCardFace"
      >
        Read front of card
      </button>
      <a v-if="parseInt(props.index, 10) !== 0" href="#0">
        Return to first card
      </a>
    </section>
  </article>
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
  position: relative;
  display: block;
  height: 90vh;
  aspect-ratio: 5 / 7;
  background-color: ivory;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

.card-face {
  backface-visibility: none;
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added line */
  border: 0;
}

.card--active .card-face--focused {
  position: initial;
  width: initial;
  height: 100%;
  padding: 1rem;
  margin: 0;
  clip: initial;
  white-space: initial; /* added line */
  border: 1px solid black;
}
</style>
