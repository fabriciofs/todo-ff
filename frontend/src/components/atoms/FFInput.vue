<template>
  <q-input outlined :model-value="modelValue" @update:modelValue="emitInput" class="q-mr-sm" />
</template>

<script setup lang="ts">
 defineProps({
   modelValue: {
    type: String,
    required: true,
    default: ''
   }
 })
 const emitters = defineEmits(['update:modelValue'])

 const emitInput = (payload: string):void => {
   emitters('update:modelValue', payload)
 }


</script>
