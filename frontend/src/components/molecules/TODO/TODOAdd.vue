<template>
  <div v-if="!todoEdinting" class="row">
    <FFInput :model-value="description" @update:model-value="emitDescription"/>
    <div style="max-width: 300px" class="q-mx-sm">
      <FFCalendar :model-value="dueDate" @update:modelValue="emitDueDate" />
    </div>
    <FFButton
      :disabled="!dueDate || !description"
      color="secondary"
      size="sm"
      @click="emitSave"
    >
      Adicionar
    </FFButton>
  </div>
</template>
<script setup lang="ts">
import FFButton from 'components/atoms/FFButton.vue';
import FFInput from 'components/atoms/FFInput.vue';
import FFCalendar from 'components/atoms/FFCalendar.vue';


defineProps({
  todoEdinting: {
    type: Object || Null,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  dueDate: {
    type: String,
    required: true,
    default: '',
  }
})

const emitters = defineEmits<{
  (event: 'update:description', payload: string): void;
  (event: 'update:dueDate', payload: string): void;
  (event: 'todo:save', payload: string): void;
}>();

const emitDescription = (payload: string): void => {
  emitters('update:description', payload);
};

const emitDueDate = (payload: string): void => {
  emitters('update:dueDate', payload);
};
const emitSave = (payload: string): void => {
  emitters('todo:save', payload);
};

</script>
