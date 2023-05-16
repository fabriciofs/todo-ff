<template>
  <ul style="min-width: 300px">
    <li v-for="todo in todos" :key="todo.id">
      <div
        v-if="todoEditing !== todo"
        class="flex items-center justify-between"
      >
          <span :class="todo.isDone ? 'text-strike' : ''" class="q-mr-sm">
            {{ todo.description }}
          </span>
        <i :class="todo.isDone ? 'text-strike' : ''">
          {{ new Date(todo.dueDate).toLocaleDateString() }}
        </i>
        <FFCheckbox
          v-model="todo.isDone"
          @update:model-value="todoCheck(todo)"
        />
        <FFButton
          title="Remover item"
          round
          icon="remove"
          color="red"
          size="xs"
          data-test="removeItem"
          @click="removeTodo(todo)"
        ></FFButton>
        <FFButton
          class="q-mx-sm"
          title="Editar item"
          round
          icon="edit"
          color="blue"
          size="xs"
          @click="editTodo(todo)"
        ></FFButton>
      </div>
      <div v-else class="flex items-center justify-between">
        <FFInput outlined v-model="todo.description"></FFInput>
        <div style="max-width: 300px" class="q-ml-sm">
          <FFCalendar v-model="todo.dueDate" />
        </div>
        <FFButton
          title="Salvar item"
          round
          icon="save"
          color="blue"
          size="xs"
          @click="updateTodo(todo)"
          data-test="saveItem"
        ></FFButton>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">

import FFButton from 'components/atoms/FFButton.vue';
import FFCheckbox from 'components/atoms/FFCheckbox.vue';
import FFCalendar from 'components/atoms/FFCalendar.vue';
import FFInput from 'components/atoms/FFInput.vue';

defineProps({
  todos: {
    type: Array,
    default: () => [],
    required: true
  },
  todoEditing: {
    type: Object || Null,
    default: null
  }
})

const emit = defineEmits<{
  (event: 'todo:remove', payload: string): void;
  (event: 'todo:edit', payload: string): void;
  (event: 'todo:update', payload: string): void;
  (event: 'todo:check', payload: string): void;
}>();

const todoCheck = (payload: string): void => {
  emit('todo:check', payload);
}
const removeTodo = (payload: string): void => {
  emit('todo:remove', payload);
}

const editTodo = (payload: string): void => {
  emit('todo:edit', payload);
}

const updateTodo = (payload: string): void => {
  emit('todo:update', payload);
}
</script>

<style scoped>

</style>
