<template>
  <div>
    <CommunicationChannelAnalysis />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommunicationChannelAnalysis from './components/CommunicationChannelAnalysis.vue';

export default defineComponent({
  name: 'App',
  components: {
    CommunicationChannelAnalysis
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
