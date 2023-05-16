<template>
  <q-input outlined :model-value="modelValue" @update:model-value="emitInput" class="q-mr-sm" />
</template>

<script setup lang="ts">
defineProps(
  {
    modelValue: {
      type: String,
      required: true
    }
  }
)

const emitters = defineEmits(['update:modelValue'])

const emitInput = (payload: string):void => {
  emitters('update:modelValue', payload)
}
</script>
