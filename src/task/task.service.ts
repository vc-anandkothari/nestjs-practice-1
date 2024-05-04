import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './task.dto';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  /**
   * The function `getTasks` retrieves a paginated list of tasks from a database in a TypeScript
   * application.
   * @param {number} page - The `page` parameter in the `getTasks` function represents the page number of
   * tasks to retrieve. It is used to calculate the starting point for querying tasks based on the
   * specified limit.
   * @param {number} limit - The `limit` parameter in the `getTasks` function specifies the maximum
   * number of tasks to be retrieved per page. It determines how many tasks will be returned in a single
   * page of results when fetching tasks from the database.
   * @returns The `getTasks` function returns an object with the following properties:
   * - `data`: An array of tasks fetched based on the provided `page` and `limit` parameters.
   * - `page`: The current page number.
   * - `limit`: The limit of tasks per page.
   * - `totalItems`: The total count of tasks in the database.
   * - `totalPages`: The total number of pages
   */
  async getTasks(page: number, limit: number) {
    const totalCount = await this.taskModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const tasks = await this.taskModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data: tasks,
      page,
      limit,
      totalItems: totalCount,
      totalPages,
      message: 'Task List Fetched',
    };
  }

  /**
   * The function `addTask` asynchronously adds a new task to the database and returns a success message
   * if the task is created successfully, otherwise throws a BadRequestException.
   * @param {TaskDto} task - The `addTask` function takes a `task` parameter of type `TaskDto`, which is
   * used to create a new task in the database. The `task` parameter likely contains information such as
   * the task title, description, due date, and any other relevant details needed to create a task.
   * @returns The `addTask` function is returning an object with the following properties:
   * - `data`: The task data that was saved
   * - `status`: The HTTP status code `201` (HttpStatus.CREATED)
   * - `message`: A success message indicating that the task was created successfully, 'Task Created
   * Successfully'
   */
  async addTask(task: TaskDto) {
    try {
      const data = new this.taskModel(task);
      await data.save();
      return {
        data,
        status: HttpStatus.CREATED,
        message: 'Task Created Successfully',
      };
    } catch {
      throw new BadRequestException();
    }
  }

  /**
   * The function `getTaskById` retrieves a task by its ID and returns the task details along with a
   * success message and status code.
   * @param {string} id - The `id` parameter in the `getTaskById` function is a string representing the
   * unique identifier of the task that is being requested. This function retrieves a task from the
   * database based on this identifier.
   * @returns {
   *   data: task,
   *   message: 'Task Details Got Successfully',
   *   status: HttpStatus.OK,
   * }
   */
  async getTaskById(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException();
    }
    return {
      data: task,
      message: 'Task Details Got Successfully',
      status: HttpStatus.OK,
    };
  }

  /**
   * This function updates a task in a database and returns a success message along with an empty data
   * array and an HTTP status code.
   * @param {string} id - The `id` parameter in the `updateTask` function is a string that represents the
   * unique identifier of the task that needs to be updated in the database.
   * @param {TaskDto} task - The `task` parameter in the `updateTask` function is of type `TaskDto`. This
   * means that it is expected to be an object that represents a task with specific properties and data.
   * The structure of the `TaskDto` object would typically include properties such as `title`,
   * `description`,
   * @returns The `updateTask` function is returning an object with the following properties:
   * - message: 'Task Updated Successfully'
   * - data: an empty array
   * - status: HttpStatus.OK
   */
  async updateTask(id: string, task: TaskDto) {
    await this.taskModel.findByIdAndUpdate(id, task).exec();
    return {
      message: 'Task Updated Successfully',
      data: [],
      status: HttpStatus.OK,
    };
  }

  /**
   * The function `removeTask` deletes a task by its ID and returns a success message along with an empty
   * data array and an HTTP status code.
   * @param {string} id - The `id` parameter in the `removeTask` function is a string that represents the
   * unique identifier of the task that needs to be deleted from the database.
   * @returns The `removeTask` function is returning an object with the following properties:
   * - `message`: 'Task Deleted Successfully'
   * - `data`: an empty array
   * - `status`: HttpStatus.OK
   */
  async removeTask(id: string) {
    await this.taskModel.findByIdAndDelete(id).exec();
    return {
      message: 'Task Deleted Successfully',
      data: [],
      status: HttpStatus.OK,
    };
  }
}
