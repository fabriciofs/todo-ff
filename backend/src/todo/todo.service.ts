import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) { }

  async create(todo: CreateTodoDto): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOneOrFail(id: string): Promise<Todo> {
    try {
      return await this.todoRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateTodoDto): Promise<Todo> {
    try {
      const todo = await this.findOneOrFail(id);
      this.todoRepository.merge(todo, data);
      return await this.todoRepository.save(todo);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOneOrFail(id);
      await this.todoRepository.softDelete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}
