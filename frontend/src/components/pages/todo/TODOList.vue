<template>
  <ul style="min-width: 300px">
    <li v-for="todo in todos" :key="todo.id" class="flex items-center justify-between">
      <span v-if="!todo.edit" :class="todo.isDone ? 'text-strike' : ''" class="q-mr-sm">
        {{ todo.description }}
      </span>
      <i v-if="!todo.edit" :class="todo.isDone ? 'text-strike' : ''">
        {{ todo.dueDate }}
      </i>
      <q-input v-if="todo.edit" v-model="todo.description" class="q-mr-sm"/>
      <FFCalendar v-model="todo.dueDate" v-if="todo.edit" />
      <slot :todo="todo" />
    </li>
  </ul>
</template>

<script setup>
 import FFCalendar from 'components/FFCalendar.vue';

 defineProps({
   todos: {
     default: []
   },
 })
</script>

<style scoped>

</style>
