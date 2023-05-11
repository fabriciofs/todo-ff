<template>
  <div class="right">
    <q-checkbox
      v-if="!todo.edit"
      v-model="isDone"
      @update:model-value="handleEmit('check:todo', $event)"
    />
    <q-btn
      v-if="!todo.edit"
      title="remover item"
      round
      icon="remove"
      color="red"
      size="xs"
      @click="handleEmit('remove:todo')"
    />
    <q-btn
      class="q-mx-sm"
      v-if="!todo.edit"
      title="remover item"
      round
      icon="edit"
      color="blue"
      size="xs"
      @click="handleEmit('edit:todo')"
    />
    <q-btn
      v-if="todo.edit"
      title="remover item"
      round
      icon="save"
      color="blue"
      size="xs"
      @click="handleEmit('save:todo')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  check: {
    type: Boolean
  },
  todo: {
    type: Object
  }
})

const handleEmit = (nameEmit, $event = null) => {
  emitter(nameEmit, $event)
}

const isDone = ref(props.todo.isDone)

const emitter = defineEmits(['check:todo', 'remove:todo', 'edit:todo', 'save:todo'])
</script>

<style scoped>

</style>
