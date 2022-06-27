<script setup lang="ts">
import useSWRV from "swrv";
import { reactive } from "vue";
import CardTemplate from "./components/Card";
import type { WaniKani } from "./types/WaniKaniAPI";

export interface CardStateProps {
  currentCardIndex: string;
}

const state: CardStateProps = reactive({
  currentCardIndex: "0",
});

const fetcher = async function (url: string): Promise<WaniKani.API.Subject[]> {
  const r = await fetch(url);
  const json = await r.json();
  return json.data;
};

const { data: kanji, error: kanjiError } = useSWRV("/api/kanji", fetcher);
const { data: vocabulary, error: vocabularyError } = useSWRV(
  "/api/vocabulary",
  fetcher
);

const setCurrentCardIndex = (cardIndex: string) => {
  state.currentCardIndex = cardIndex;
}
</script>

<template>
  <header>
    <h1>Kanji Cards</h1>
  </header>

  <main>
    <p v-if="kanjiError">Oops, hit a snag loading the kanji.</p>
    <p v-if="vocabularyError">Oops, hit a snag loading the vocabulary.</p>

    <div class="wrapper">
      <CardTemplate
        v-for="(ji, index) in kanji"
        v-bind:key="ji.id"
        :index="index.toString()"
        :currentCardIndex="state.currentCardIndex"
        @focus="setCurrentCardIndex(index.toString())"
      >
        <template v-slot:front>
          <h2>{{ ji.data.characters }}</h2>
          <p>{{ ji.data.meaning }}</p>
        </template>
        <template v-slot:back>
          <p v-for="word in vocabulary" v-bind:key="word.id">
            {{ word.data.characters }} -
            {{ (word.data.meanings as WaniKani.API.Meaning[]).map((m: WaniKani.API.Meaning) => m.meaning).join(", ") }}
          </p>
        </template>
      </CardTemplate>
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
