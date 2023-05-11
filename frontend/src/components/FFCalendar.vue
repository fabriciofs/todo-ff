<template>
  <q-input outlined v-model="proxyDate" class="q-mr-sm">
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="proxyDate" mask="YYYY-MM-DD HH:mm">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="proxyDate" mask="YYYY-MM-DD HH:mm" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import {ref, watch} from 'vue';
const proxyDate = ref('')

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emitter = defineEmits(['update:modelValue'])


watch(proxyDate, (newValue) => {
  emitter('update:modelValue', newValue)
})

watch(props, (newValue) => {
  proxyDate.value = newValue.modelValue
}, {deep: true, immediate: true})

const clearValue = () => {
  proxyDate.value = ''
}

defineExpose({
  clearValue
})
</script>

<style scoped>

</style>
