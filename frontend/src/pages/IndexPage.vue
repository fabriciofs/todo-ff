<template>
  <q-page
    class="items-center flex column"
  >
    <h2>TODO-LIST</h2>
    <TODONewItem
      @add:todo="addTodo"
    />
    <TODOList
      :todos="todos"
      v-slot="slotProps"
    >
      <TODOActions
        :edit="slotProps.todo.edit"
        v-model:check="slotProps.todo.isDone"
        :todo="slotProps.todo"
        @check:todo="checkTodo(slotProps.todo, $event)"
        @edit:todo="slotProps.todo.edit = !slotProps.todo.edit"
        @save:todo="saveTodo(slotProps.todo)"
        @remove:todo="removeItem(slotProps.todo.id)"
        @update:check="slotProps.todo.isDone = false"
      />
    </TODOList>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {createTodo, getAllTodo, removeTodo, updateTodo} from 'src/service/todo';
import axios from 'axios';

import TODOActions from 'components/pages/todo/TODOActions.vue';
import TODOList from 'components/pages/todo/TODOList.vue';
import TODONewItem from 'components/pages/todo/TODONewItem.vue';

const todos = ref([]);

const checkTodo = async (todo, isDone) => {
    const index = todos.value.findIndex(item => item.id === todo.id)
    todos.value[index].isDone = isDone
  const newPayload = {
    ...todo,
    isDone
  }
  await axios.put(`http://localhost:3000/todos/${todo.id}`, newPayload)
}

const saveTodo = async (todo) => {
  await updateTodo(todo)
  const index = todos.value.findIndex(item => item.id === todo.id)
  todos.value[index].edit = false
}
const removeItem = async (id) => {
  await removeTodo(id)
  await getTodos()
}
const addTodo = async (payload) => {
  await createTodo(payload)
  await getTodos()
}

const getTodos = () => {
  return getAllTodo()
    .then((response) => {
      todos.value = response.map(item => ({
        ...item,
        edit: false
      }))
    })
}

onMounted(() => {
  getTodos()
})
</script>
