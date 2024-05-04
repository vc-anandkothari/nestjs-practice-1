"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TaskService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var task_schema_1 = require("./task.schema");
var TaskService = /** @class */ (function () {
    function TaskService(taskModel) {
        this.taskModel = taskModel;
    }
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
    TaskService.prototype.getTasks = function (page, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var totalCount, totalPages, tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskModel.countDocuments()];
                    case 1:
                        totalCount = _a.sent();
                        totalPages = Math.ceil(totalCount / limit);
                        return [4 /*yield*/, this.taskModel
                                .find()
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .exec()];
                    case 2:
                        tasks = _a.sent();
                        return [2 /*return*/, {
                                data: tasks,
                                page: page,
                                limit: limit,
                                totalItems: totalCount,
                                totalPages: totalPages,
                                message: 'Task List Fetched'
                            }];
                }
            });
        });
    };
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
    TaskService.prototype.addTask = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        data = new this.taskModel(task);
                        return [4 /*yield*/, data.save()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, {
                                data: data,
                                status: common_1.HttpStatus.CREATED,
                                message: 'Task Created Successfully'
                            }];
                    case 2:
                        _a = _b.sent();
                        throw new common_1.BadRequestException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
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
    TaskService.prototype.getTaskById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskModel.findById(id)];
                    case 1:
                        task = _a.sent();
                        if (!task) {
                            throw new common_1.NotFoundException();
                        }
                        return [2 /*return*/, {
                                data: task,
                                message: 'Task Details Got Successfully',
                                status: common_1.HttpStatus.OK
                            }];
                }
            });
        });
    };
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
    TaskService.prototype.updateTask = function (id, task) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskModel.findByIdAndUpdate(id, task).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Task Updated Successfully',
                                data: [],
                                status: common_1.HttpStatus.OK
                            }];
                }
            });
        });
    };
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
    TaskService.prototype.removeTask = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskModel.findByIdAndDelete(id).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Task Deleted Successfully',
                                data: [],
                                status: common_1.HttpStatus.OK
                            }];
                }
            });
        });
    };
    TaskService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(task_schema_1.Task.name))
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
