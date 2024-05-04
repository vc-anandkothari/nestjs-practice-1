import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http.exception-filter';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: TaskDto) {
    return this.taskService.addTask(createTaskDto);
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  updateTask(@Param('id') id: string, @Body() createTaskDto: TaskDto) {
    return this.taskService.updateTask(id, createTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id', ParseIntPipe) id: string) {
    return this.taskService.removeTask(id);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Get()
  getTasks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit: number,
  ) {
    return this.taskService.getTasks(page, limit);
  }
}
