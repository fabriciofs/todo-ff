<template>
  <q-page class="items-center flex column">
    <FFTitle :is="'h3'">TODO-LIST</FFTitle>
    <TODOAdd v-model:due-date="data.dueDate" v-model:description="data.description" :todo-edinting="data.todoEdinting" @todo:save="data.todoList.addTodo(data.description, data.dueDate)"/>
    <div class="text-h6 q-pt-lg" v-if="data.todoList.items.length === 0">
      Não ha tarefas
    </div>
    <TODOList
      v-else
      @todo:remove="data.todoList.removeTodo($event)"
      @todo:check="data.todoList.updateTodo($event)"
      @todo:edit="data.todoEdinting = $event"
      @todo:update="data.todoList.updateTodo($event)"
      :todo-edinting="data.todoEdinting"
      :todos="data.todoList.items"
    />
  </q-page>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from 'vue';
import TodoGateway from '../gateways/TodoGateway';
import TodoList from '../entities/TodoList';
import Observer from '../entities/Observer';
import { Todo } from '../entities/Todo';
import { useQuasar } from 'quasar';
import TODOList from 'components/molecules/TODO/TODOList.vue';
import TODOAdd from 'components/molecules/TODO/TODOAdd.vue';
import FFTitle from 'components/atoms/FFTitle.vue';

const $q = useQuasar();

type Data = {
  todoList: TodoList;
  description: string;
  dueDate: string;
  todoEdinting: Todo | null;
};

const todoGateway = inject('todoGateway') as TodoGateway;
const data: Data = reactive({
  todoList: new TodoList(todoGateway),
  description: '',
  dueDate: '',
  todoEdinting: null,
});

onMounted(async () => {
  try {
    await data.todoList.getTodos();
  } catch (error) {
    if (error instanceof Error) {
      $q.dialog({
        title: 'Erro no retorno da API',
        message: error.message,
        color: 'red',
      });
      return;
    }
  }
  data.todoList.register(
    new Observer('addTodo', async function () {
      data.description = '';
      data.dueDate = '';
    })
  );
  data.todoList.register(
    new Observer('updateTodo', async function () {
      data.description = '';
      data.dueDate = '';
      data.todoEdinting = null;
    })
  );
});
</script>
