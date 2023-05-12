import { Todo } from "src/entities/Todo";
import TodoGateway from "./TodoGateway";
import HttpClient from "src/infra/httpClient";

export default class TodoHttpGateway implements TodoGateway {

  constructor(private httpClient: HttpClient, readonly baseUrl: string, readonly endPoint: string) { }

  async getItems(): Promise<Todo[]> {
    const todosData: Todo[] = await this.httpClient.get(`${this.baseUrl}/${this.endPoint}`)
    return todosData;
  }

  async addItem(item: Todo): Promise<Todo> {
    const result = await this.httpClient.post(`${this.baseUrl}/${this.endPoint}`, item)
    const todo: Todo = result;
    return todo;
  }

  async updateItem(item: Todo): Promise<Todo> {
    const result = await this.httpClient.put(`${this.baseUrl}/${this.endPoint}/${item.id}`, item)
    const todo: Todo = result;
    return todo;
  }

  removeItem(id: string): Promise<void> {
    return this.httpClient.delete(`${this.baseUrl}/${this.endPoint}/${id}`)
  }
}