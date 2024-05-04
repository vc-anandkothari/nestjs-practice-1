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
exports.__esModule = true;
exports.TaskController = void 0;
var common_1 = require("@nestjs/common");
var http_exception_filter_1 = require("./http.exception-filter");
var TaskController = /** @class */ (function () {
    function TaskController(taskService) {
        this.taskService = taskService;
    }
    TaskController.prototype.createTask = function (createTaskDto) {
        return this.taskService.addTask(createTaskDto);
    };
    TaskController.prototype.updateTask = function (id, createTaskDto) {
        return this.taskService.updateTask(id, createTaskDto);
    };
    TaskController.prototype.removeTask = function (id) {
        return this.taskService.removeTask(id);
    };
    TaskController.prototype.getTaskById = function (id) {
        return this.taskService.getTaskById(id);
    };
    TaskController.prototype.getTasks = function (page, limit) {
        return this.taskService.getTasks(page, limit);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], TaskController.prototype, "createTask");
    __decorate([
        common_1.Put(':id'),
        common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], TaskController.prototype, "updateTask");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], TaskController.prototype, "removeTask");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], TaskController.prototype, "getTaskById");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
        __param(1, common_1.Query('limit', new common_1.DefaultValuePipe(30), common_1.ParseIntPipe))
    ], TaskController.prototype, "getTasks");
    TaskController = __decorate([
        common_1.Controller('task')
    ], TaskController);
    return TaskController;
}());
exports.TaskController = TaskController;
