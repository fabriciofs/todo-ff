<template>
  <q-page class="items-center flex column">
    <h2 class="">TODO-LIST</h2>
    <div class="row">
      <q-input outlined v-model="newTodo" @keyup.enter="addTodo" class="q-mr-sm" />
      <div style="max-width: 300px">
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
      </div>
      <q-btn :disabled="!proxyDate || !newTodo" color="secondary" size="sm" @click="addTodo">Adicionar</q-btn>
    </div>
    <ul style="min-width: 300px">
      <li v-for="todo in todos" :key="todo.id" class="flex items-center justify-between">
        <span v-if="!todo.edit" :class="todo.isDone ? 'text-strike' : ''" class="q-mr-sm"> {{ todo.description }} </span>
        <i v-if="!todo.edit" :class="todo.isDone ? 'text-strike' : ''"> {{ todo.dueDate }} </i>
        <q-input v-if="todo.edit" v-model="todo.description" @keyup.enter="saveTodo(todo)"></q-input>
        <div v-if="todo.edit" style="max-width: 300px">
          <q-input outlined v-model="todo.dueDate" class="q-mr-sm">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="todo.dueDate" mask="YYYY-MM-DD HH:mm">
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
                  <q-time v-model="todo.proxyDate" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="right">
          <q-checkbox v-if="!todo.edit" v-model="todo.isDone" @update:model-value="checkTodo(todo, $event)" />
          <q-btn v-if="!todo.edit" title="remover item" round icon="remove" color="red" size="xs"
            @click="removeItem(todo.id)"></q-btn>
          <q-btn class="q-mx-sm" v-if="!todo.edit" title="remover item" round icon="edit" color="blue" size="xs"
            @click="editItem(todo)"></q-btn>
          <q-btn v-if="todo.edit" title="remover item" round icon="save" color="blue" size="xs"
            @click="saveTodo(todo)"></q-btn>
        </div>
      </li>
    </ul>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const newTodo = ref('')
const proxyDate = ref('')
const todos = ref([]);

const checkTodo = async (item, isDone) => {
  const newPayload = {
    ...item,
    isDone
  }
  await axios.put(`http://localhost:3000/todos/${item.id}`, newPayload)
}

const saveTodo = async (todo) => {
  await axios.put(`http://localhost:3000/todos/${todo.id}`, todo)
  const index = todos.value.findIndex(item => item.id === todo.id)
  todos.value[index].edit = false
}
const removeItem = async (id) => {
  await axios.delete(`http://localhost:3000/todos/${id}`)
  await updateTodo()
}

const editItem = async (todo) => {
  const index = todos.value.findIndex(item => item.id === todo.id)
  todos.value[index].edit = true
}

const addTodo = async () => {
  if (!newTodo.value.trim()) return
  const dateString = proxyDate.value;
  const dateObj = new Date(dateString);
  const isoString = dateObj.toISOString();
  await axios.post('http://localhost:3000/todos', {
    description: newTodo.value,
    dueDate: isoString,
    isDone: false
  })
  newTodo.value = ''
  proxyDate.value = ''
  await updateTodo()
}

const updateTodo = () => {
  return axios.get('http://localhost:3000/todos')
    .then((response) => {
      todos.value = response.data
    })
}

onMounted(() => {
  updateTodo()
})
</script>
