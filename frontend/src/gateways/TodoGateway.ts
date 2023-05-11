import { Todo } from 'src/entities/Todo';

export default interface TodoGateway {
	getItems(): Promise<Todo[]>;
	addItem(item: Todo): Promise<Todo>;
	updateItem(item: Todo): Promise<void>;
	removeItem(id: string): Promise<void>;
}
