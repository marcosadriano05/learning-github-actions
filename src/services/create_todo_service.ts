import { Todo, TodoType } from "/src/domain/todo/todo.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { GetOneService } from "./todo_service.ts";
import { Repository } from "/src/infra/repository.ts";

export class CreateTodoService implements GetOneService<TodoType> {
  constructor(private readonly todoRepository: Repository<Todo, TodoType>) {}

  async perform(request: HttpRequest): Promise<TodoType> {
    const { title, description, startDate, finishDate } = request.body;
    const todo = new Todo(title);
    todo.setDescription(description);
    todo.setStartDate(startDate);
    todo.setFinishDate(finishDate);
    const savedTodo = await this.todoRepository.save(todo);
    return savedTodo;
  }
}
