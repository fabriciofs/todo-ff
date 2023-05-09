<template>
  <q-page class="items-center flex column">
    <h2 class="">TODO-LIST</h2>
    <div class="row">
      <q-input outlined v-model="newTodo" @keyup.enter="addTodo" class="q-mr-sm"/>
      <q-btn color="secondary" @click="addTodo">add</q-btn>
    </div>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
      @update-todo="updateTodo"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import {onMounted, ref} from 'vue';
import { api } from 'boot/axios'

const newTodo = ref('')

const todos = ref<Todo[]>([]);

const meta = ref<Meta>({
  totalCount: 0
});

const addTodo = async () => {
  if (!newTodo.value.trim()) return
  await api.post('/todos', {
    "description": newTodo.value,
    "dueDate": new Date().toISOString(),
    "isDone": false
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
