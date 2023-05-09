<template>
  <div>
    <ul>
      <li v-for="todo in customTodos" :key="todo.id" @click="increment" class="flex items-center justify-between">
        <span v-if="!todo.edit" :class="todo.isDone ? 'text-strike' : ''"> {{ todo.description }} </span>
        <q-input v-if="todo.edit" v-model="todo.description"></q-input>
        <div class="right">
          <q-checkbox v-if="!todo.edit" v-model="todo.isDone" @update:model-value="checkTodo(todo, $event)"/>
          <q-btn v-if="!todo.edit" title="remover item" round icon="remove" color="red" size="xs" @click="removeItem(todo.id)"></q-btn>
          <q-btn class="q-mx-sm" v-if="!todo.edit" title="remover item" round icon="edit" color="blue" size="xs" @click="editItem(todo)"></q-btn>
          <q-btn v-if="todo.edit" title="remover item" round icon="save" color="blue" size="xs" @click="saveTodo(todo)"></q-btn>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import { Todo, Meta } from './models';
import { api } from 'boot/axios'

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}

const emit = defineEmits(['updateTodo'])

const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const customTodos = ref([])

watch(props, (value) => {
  customTodos.value = value.todos
}, { immediate: true, deep: true })

const checkTodo = async (item, isDone) => {
  const newPayload = {
    ...item,
    isDone
  }
  await api.put(`/todos/${item.id}`, newPayload)
}
const saveTodo = async (todo) => {
  await api.put(`/todos/${todo.id}`, todo)
  const index = customTodos.value.findIndex(item => item.id === todo.id)
  customTodos.value[index].edit = false
}
const removeItem = async (id) => {
  await api.delete(`/todos/${id}`)
  emit('updateTodo')
}

const editItem = async(todo) => {
  const index = customTodos.value.findIndex(item => item.id === todo.id)
  customTodos.value[index].edit = true
}

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}
</script>
