<template>
  <q-page class="items-center flex column">
    <FFTitle tag="h2">
      TODO-LIST
    </FFTitle>
    <div v-if="!data.todoEditing" class="row">
      <TODOAdd v-model:description="data.description" v-model:due-date="data.dueDate" @todo:save="data.todoList.addTodo(data.description, data.dueDate)"/>
    </div>
    <div class="text-h6 q-pt-lg" v-if="data.todoList.items.length === 0">
      Não ha tarefas
    </div>
    <TODOList v-else :todoEditing="data.todoEditing" :todos="data.todoList.items" @todo:remove="data.todoList.removeTodo($event)" @todo:edit="data.todoEditing = $event" @todo:update="data.todoList.updateTodo($event)" @todo:check="data.todoList.updateTodo($event)"/>
  </q-page>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from 'vue';
import Observer from '../entities/Observer';
import { Todo } from '../entities/Todo';
import TodoList from '../entities/TodoList';
import TodoGateway from '../gateways/TodoGateway';
import TODOAdd from 'components/molecules/TODO/TODOAdd.vue';
import TODOList from 'components/molecules/TODO/TODOList.vue';
import FFTitle from 'components/atoms/FFTitle.vue';

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
