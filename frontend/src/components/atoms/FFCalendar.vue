<template>
  <q-input outlined :model-value="modelValue" @update:modelValue="emitInput" mask="date">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date :model-value="modelValue" @update:modelValue="emitInput">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
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

