import TodoGateway from 'src/gateways/TodoGateway';
import { Todo } from './Todo';
import Observable from './Observable';

export default class TodoList extends Observable {
  items: Todo[] = [];

  constructor(readonly todoGateway: TodoGateway) {
    super()
  }

  async getTodos() {
    const todos = await this.todoGateway.getItems()
    this.items = [];
    if (todos) {
      for (const item of todos) {
        this.items.push(item)
      }
    }
    this.notify('getTodos', todos)
  }

  async addTodo(description: string, dueDate: string): Promise<Todo | undefined> {
    if (!description || !dueDate) return
    if (this.items.some((item: Todo) => item.description === description)) return
    const item: Todo = { description, dueDate }
    const todo = await this.todoGateway.addItem(item)
    this.items.push(todo)
    this.notify('addTodo', todo)
    return todo
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    return this.items.find((todo: Todo) => todo.id === id);
  }

  async removeTodo(todo: Todo) {
    await this.todoGateway.removeItem(todo.id!);
    this.items.splice(this.items.indexOf(todo), 1)
    this.notify('removeTodo', todo)
  }

  async updateTodo(todo: Todo) {
    await this.todoGateway.updateItem(todo);
    this.notify('updateTodo', todo)
  }

}