<template>
  <div>
    <h1>Channel Wise Communication Effectiveness</h1>
    <p>Email: {{ emailEffectiveness }}%</p>
    <p>SMS: {{ smsEffectiveness }}%</p>
    <p>WhatsApp: {{ whatsappEffectiveness }}%</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CommunicationChannelAnalysis',
  setup() {
    const emailEffectiveness = ref(70);
    const smsEffectiveness = ref(50);
    const whatsappEffectiveness = ref(80)

    return {
      emailEffectiveness,
      smsEffectiveness,
      whatsappEffectiveness
    };
  }
});
</script>

<style scoped></style>
