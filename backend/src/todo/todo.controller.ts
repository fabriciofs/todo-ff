import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'The todo has been created.' })
  create(@Body() todo: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'List of todos.' })
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific todo by ID' })
  @ApiResponse({ status: 200, description: 'The todo with the specified ID.' })
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({ status: 200, description: 'The todo has been updated.' })
  update(@Param('id') id: string, @Body() todo: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 204, description: 'The todo has been deleted.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
