import { Todo, TodosSchema } from 'src/entities/Todo';
import HttpClient from '../infra/httpClient';
import TodoGateway from './TodoGateway';

export default class TodoHttpGateway implements TodoGateway {

	constructor(readonly httpClient: HttpClient, readonly baseUrl: string, readonly endPoint: string = 'todos') {
	}

	async getItems(): Promise<Todo[]> {
		const response = await this.httpClient.get(`${this.baseUrl}/${this.endPoint}`)
		const paresedTodosData = TodosSchema.safeParse(response)
		if (paresedTodosData.success) {
			const todosData: Todo[] = paresedTodosData.data;
			return todosData;
		} else {
			throw new Error(paresedTodosData.error.message)
		}
	}

	async addItem(item: Todo): Promise<Todo> {
		const result = await this.httpClient.post(`${this.baseUrl}/${this.endPoint}`, item);
		const todo: Todo = result;
		return todo;
	}

	async updateItem(item: Todo): Promise<void> {
		await this.httpClient.put(`${this.baseUrl}/${this.endPoint}/${item.id}`, item);
	}

	async removeItem(id: string): Promise<void> {
		await this.httpClient.delete(`${this.baseUrl}/${this.endPoint}/${id}`);
	}

}
