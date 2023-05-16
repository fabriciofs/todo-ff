<template>
  <div class="flex">
    <FFInput :model-value="description" @update:modelValue="emitDescription" />
    <div style="max-width: 300px" class="q-mx-sm">
      <FFCalendar :model-value="dueDate" @update:modelValue="emitDueDate" />
    </div>
    <FFButton
      :disabled="!dueDate || !description"
      color="secondary"
      size="sm"
      @click="emitSave"
    >Adicionar</FFButton
    >
  </div>
</template>

<script setup lang="ts">
import FFButton from 'components/atoms/FFButton.vue';
import FFCalendar from 'components/atoms/FFCalendar.vue';
import FFInput from 'components/atoms/FFInput.vue';

defineProps({
  description: {
    type: String,
    required: true,
    default: '',
  },
  dueDate: {
    type: String,
    required: true,
    default: '',
  },
})

const emit = defineEmits<{
  (event: 'update:description', payload: string): void;
  (event: 'update:dueDate', payload: string): void;
  (event: 'todo:save', payload: string): void;
}>();

const emitDescription = (payload: string): void => {
  emit('update:description', payload);
}

const emitDueDate = (payload: string): void => {
  emit('update:dueDate', payload);
}

const emitSave = (payload: string): void => {
  emit('todo:save', payload);
}
</script>

<style scoped>

</style>
