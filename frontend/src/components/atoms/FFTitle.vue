<template>
  <component :is="tagElement as string" class="title">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
  const props = defineProps({
    tag: {
      type: String,
      default: 'h1',
      validator: function (value) {
        return typeof value === 'string' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(value) !== -1
      }
    }
  })

const tagElement = computed(() => {
  const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  return validTags.includes(props.tag) ? props.tag : 'h1'
})
</script>

<style scoped>

</style>
