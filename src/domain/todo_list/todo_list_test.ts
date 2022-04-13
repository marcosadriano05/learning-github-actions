import { assert, assertEquals, assertThrows } from "../../../external/tests.ts";
import { v4 } from "../../../external/uuid.ts";
import { Todo } from "../todo/todo.ts";
import { TodoList } from "./todo_list.ts";
import { TodoListError } from "./todo_list_error.ts";

let todoList: TodoList;
let todo1: Todo;
let todo2: Todo;
function beforeEach() {
  todoList = new TodoList("Any category");

  todo1 = new Todo("Todo 1");
  todo2 = new Todo("Todo 2");
  todoList.addTodo(todo1);
  todoList.addTodo(todo2);
}

Deno.test("TodoList: should create a TodoList with a category", function () {
  beforeEach();
  const category = todoList.getCatedory();

  assertEquals(category, "Any category");
});

Deno.test("TodoList: should be created with a random uuid id", function () {
  beforeEach();

  const todoListId = todoList.getId();

  assert(v4.validate(todoListId));
});

Deno.test("TodoList: should add a Todo in TodoList", function () {
  beforeEach();

  assert(todoList.getTodos().some((todo) => todo.getTitle() === "Todo 1"));
  assert(todoList.getTodos().some((todo) => todo.getTitle() === "Todo 2"));
  assertEquals(
    1,
    todoList.getTodos().filter((todo) => todo.getTitle() === "Todo 1").length,
  );
});

Deno.test("TodoList: should remove a Todo with specific id", function () {
  beforeEach();

  const todoId = todo1.getId();
  todoList.removeTodo(todoId);

  assertEquals(
    todoList.getTodos().find((todo) => todo.getTitle() === "Todo 1"),
    undefined,
  );
});

Deno.test("TodoList: should throw an error if Todo id is not present", function () {
  beforeEach();

  assertThrows(
    () => todoList.removeTodo("Any id"),
    TodoListError,
    "Todo not found in the list.",
  );
});
