<template>
  <div
    class="row"
  >
    <q-input
      outlined
      v-model="description"
      class="q-mr-sm"
    />
    <div
      style="max-width: 300px"
    >
      <FFCalendar
        ref="addDueDate"
        v-model="proxyDate"
      />
    </div>
    <q-btn
      :disabled="!proxyDate || !description"
      color="secondary"
      size="sm"
      @click="addTodo"
    >
      Adicionar
    </q-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FFCalendar from 'components/FFCalendar.vue';
const emitters = defineEmits(['add:todo', 'update:description']);

const addDueDate = ref(null)
const description = ref('')
const proxyDate = ref('')
const addTodo = () => {
  if (!description.value.trim()) return
  const dateString = proxyDate.value;
  const dateObj = new Date(dateString);
  const isoString = dateObj.toISOString();
  emitters('add:todo', {
    description: description.value,
    dueDate: isoString,
    isDone: false
  })
  addDueDate.value.clearValue()
  description.value = ''
}
</script>

<style scoped>

</style>
