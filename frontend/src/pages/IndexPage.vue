<template>
  <q-page class="items-center flex column">
    <h2 class="">TODO-LIST</h2>
    <div class="row">
      <q-input outlined v-model="newTodo" @keyup.enter="addTodo" class="q-mr-sm"/>
      <q-btn color="secondary" @click="addTodo">add</q-btn>
    </div>
    <ul style="min-width: 300px">
      <li v-for="todo in todos" :key="todo.id" @click="increment" class="flex items-center justify-between">
        <span v-if="!todo.edit" :class="todo.isDone ? 'text-strike' : ''"> {{ todo.description }} </span>
        <q-input v-if="todo.edit" v-model="todo.description" @keyup.enter="saveTodo(todo)"></q-input>

        <div class="right">
          <q-checkbox v-if="!todo.edit" v-model="todo.isDone" @update:model-value="checkTodo(todo, $event)"/>
          <q-btn v-if="!todo.edit" title="remover item" round icon="remove" color="red" size="xs" @click="removeItem(todo.id)"></q-btn>
          <q-btn class="q-mx-sm" v-if="!todo.edit" title="remover item" round icon="edit" color="blue" size="xs" @click="editItem(todo)"></q-btn>
          <q-btn v-if="todo.edit" title="remover item" round icon="save" color="blue" size="xs" @click="saveTodo(todo)"></q-btn>
        </div>
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import {onMounted, ref } from 'vue';
import { api } from 'boot/axios'

const newTodo = ref('')
const proxyDate = ref('')
const todos = ref<Todo[]>([]);

const meta = ref<Meta>({
  totalCount: 0
});

const checkTodo = async (item, isDone) => {
  const newPayload = {
    ...item,
    isDone
  }
  await api.put(`/todos/${item.id}`, newPayload)
}
const saveTodo = async (todo) => {
  await api.put(`/todos/${todo.id}`, todo)
  const index = todos.value.findIndex(item => item.id === todo.id)
  todos.value[index].edit = false
}
const removeItem = async (id) => {
  await api.delete(`/todos/${id}`)
  await updateTodo()
}

const editItem = async(todo) => {
  const index = todos.value.findIndex(item => item.id === todo.id)
  todos.value[index].edit = true
}

const addTodo = async () => {
  if (!newTodo.value.trim()) return
  await api.post('/todos', {
    description: newTodo.value,
    dueDate: new Date().toISOString(),
    isDone: false
  })
  newTodo.value = ''
  await updateTodo()
}

const updateTodo = () => {
  return api.get('/todos')
    .then((response) => {
      todos.value = response.data
      meta.value.totalCount = response.data.length
    })
}

onMounted(() => {
  updateTodo()
})
</script>
