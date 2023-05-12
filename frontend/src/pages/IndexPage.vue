<template>
  <q-page class="items-center flex column">
    <h2 class="">TODO-LIST</h2>
    <div v-if="!data.todoEditing" class="row">
      <q-input outlined v-model="data.description" class="q-mr-sm" />
      <div style="max-width: 300px" class="q-mx-sm">
        <q-input outlined v-model="data.dueDate" mask="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="data.dueDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <q-btn
        :disabled="!data.dueDate || !data.description"
        color="secondary"
        size="sm"
        @click="data.todoList.addTodo(data.description, data.dueDate)"
        >Adicionar</q-btn
      >
    </div>
    <div class="text-h6 q-pt-lg" v-if="data.todoList.items.length === 0">
      Não ha tarefas
    </div>
    <ul v-else style="min-width: 300px">
      <li v-for="todo in data.todoList.items" :key="todo.id">
        <div
          v-if="data.todoEditing !== todo"
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
            @update:model-value="data.todoList.updateTodo(todo)"
          />
          <q-btn
            title="remover item"
            round
            icon="remove"
            color="red"
            size="xs"
            @click="data.todoList.removeTodo(todo)"
          ></q-btn>
          <q-btn
            class="q-mx-sm"
            title="remover item"
            round
            icon="edit"
            color="blue"
            size="xs"
            @click="data.todoEditing = todo"
          ></q-btn>
        </div>
        <div v-else class="flex items-center justify-between">
          <q-input outlined v-model="todo.description"></q-input>
          <div style="max-width: 300px" class="q-ml-sm">
            <q-input outlined v-model="todo.dueDate" mask="date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="todo.dueDate">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <q-btn
            title="Salvar item"
            round
            icon="save"
            color="blue"
            size="xs"
            @click="data.todoList.updateTodo(todo)"
          ></q-btn>
        </div>
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from 'vue';
import Observer from '../entities/Observer';
import { Todo } from '../entities/Todo';
import TodoList from '../entities/TodoList';
import TodoGateway from '../gateways/TodoGateway';

type Data = {
  todoList: TodoList;
  description: string;
  dueDate: string;
  todoEditing: Todo | null;
};
const todoGateway = inject('todoGateway') as TodoGateway;
const data: Data = reactive({
  todoList: new TodoList(todoGateway),
  description: '',
  dueDate: '',
  todoEditing: null,
});

onMounted(() => {
  data.todoList.getTodos();
  data.todoList.register(
    new Observer('addTodo', () => {
      data.description = '';
      data.dueDate = '';
    })
  );
  data.todoList.register(
    new Observer('updateTodo', () => {
      data.todoEditing = null;
    })
  );
});
</script>
