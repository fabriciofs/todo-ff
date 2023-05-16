<template>
  <ul style="min-width: 300px">
    <li v-for="todo in todos" :key="todo.id">
      <div
        v-if="todoEdinting !== todo"
        class="flex items-center justify-between"
      >
          <span :class="todo.isDone ? 'text-strike' : ''" class="q-mr-sm">
            {{ todo.description }}
          </span>
        <i :class="todo.isDone ? 'text-strike' : ''">
          {{ new Date(todo.dueDate).toLocaleDateString() }}
        </i>
        <q-checkbox
          v-model="todo.isDone"
          @update:model-value="todoCheck(todo)"
        />
        <FFButton
          title="remover item"
          round
          icon="remove"
          color="red"
          size="xs"
          @click="todoRemove(todo)"
          data-test="removeItem"
        ></FFButton>
        <FFButton
          class="q-mx-sm"
          title="edit item"
          round
          icon="edit"
          color="blue"
          size="xs"
          @click="todoEdit(todo)"
          data-test="editItem"
        ></FFButton>
      </div>
      <div v-else class="flex items-center justify-between">
        <q-input outlined v-model="todo.description"></q-input>
        <FFCalendar v-model="todo.dueDate" />
        <FFButton
          title="update item"
          round
          icon="save"
          color="blue"
          size="xs"
          @click="todoUpdate(todo)"
          data-teste="updateItem"
        ></FFButton>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">

import FFButton from 'components/atoms/FFButton.vue';
import FFCalendar from 'components/atoms/FFCalendar.vue';

defineProps({
  todos: {
    type: Array,
    default: () => [],
    required: true
  },
  todoEdinting: {
    type: Object || Null,
    default: null
  }
})

const emitters = defineEmits(['todo:check', 'todo:remove', 'todo:edit', 'todo:update'])

const todoCheck = (payload: string): void => {
  emitters('todo:check', payload)
}
const todoRemove = (payload: string): void => {
  emitters('todo:remove', payload)
}

const todoEdit = (payload: string): void => {
  emitters('todo:edit', payload)
}
const todoUpdate = (payload: string): void => {
  emitters('todo:update', payload)
}

</script>
