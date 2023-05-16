import { Todo } from 'src/entities/Todo';
import TodoList from 'src/entities/TodoList';
import TodoGateway from 'src/gateways/TodoGateway';
import { describe, expect, it } from 'vitest';


class TodoHttpGatewayMemory implements TodoGateway {
  private todos: Todo[] = [];
  async getItems(): Promise<Todo[]> {
    return this.todos;
  }
  async addItem(item: Todo): Promise<Todo> {
    const todo: Todo = {
      id: "1",
      description: item.description,
      dueDate: item.dueDate,
      isDone: false
    }
    this.todos.push(todo);
    return todo
  }
  async updateItem(item: Todo): Promise<Todo> {
    const index = this.todos.findIndex((todo: Todo) => todo.id === item.id);
    if (index === -1) throw new Error('Item not found');
    this.todos[index] = item;
    return item;
  }
  async removeItem(id: string): Promise<void> {
    const index = this.todos.findIndex((todo: Todo) => todo.id === id);
    if (index === -1) throw new Error('Item not found');
    this.todos.splice(index, 1);
    return
  }
}

describe('TodoList', () => {

  it('deve ser instanciada com a lista de todos vazia', async () => {
    const todoList = new TodoList(new TodoHttpGatewayMemory());
    expect(todoList.items).toHaveLength(0)
    expect(todoList.items).toEqual([]);
  });

  it('deve ser criado 1 item', async () => {
    const todoList = new TodoList(new TodoHttpGatewayMemory());
    await todoList.addTodo("descricao teste", "2021-01-01");
    expect(todoList.items).toHaveLength(1)
    expect(todoList.items[0]).toEqual({
      id: "1",
      description: "descricao teste",
      dueDate: "2021-01-01",
      isDone: false
    })
  });

  it('deve ser alterado 1 item', async () => {
    const todoList = new TodoList(new TodoHttpGatewayMemory());
    const todo = await todoList.addTodo("descricao teste", "2021-01-01");
    await todoList.updateTodo({ ...todo!, description: "descricao teste alterada" });
    await todoList.getTodos();
    expect(todoList.items).toHaveLength(1)
    expect(todoList.items[0]).toEqual({
      id: "1",
      description: "descricao teste alterada",
      dueDate: "2021-01-01",
      isDone: false
    })
  });

  it('deve ser removido 1 item', async () => {
    const todoList = new TodoList(new TodoHttpGatewayMemory());
    const todo = await todoList.addTodo("descricao teste", "2021-01-01");
    expect(todoList.items).toHaveLength(1)
    await todoList.removeTodo(todo!);
    await todoList.getTodos();
    expect(todoList.items).toHaveLength(0)
  });

  it('deve retornar uma exceção quando alterar um TODO inexistente', async () => {
    const todoList = new TodoList(new TodoHttpGatewayMemory());
    const todo = await todoList.addTodo("descricao teste", "2021-01-01");
    await todoList.getTodos();
    expect(todoList.items).toHaveLength(1)
    try {
      await todoList.updateTodo({ ...todo!, id: "2" });
    } catch (error: any) {
      expect(error.message).toEqual('Item not found');
    }
  });
});
