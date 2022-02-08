import { Todo } from '../../models';

export let incOrder = (todos: Todo[], order: number) =>
    todos.map((item) =>
        item.order > order
            ? {
                  ...item,
                  order: item.order + 1,
              }
            : item
    );

export let decOrder = (todos: Todo[], order: number) =>
    todos.map((item) =>
        item.order >= order
            ? {
                  ...item,
                  order: item.order - 1,
              }
            : item
    );

export let update = (todos: Todo[], updatedTodo: Todo) =>
    todos.map((item) => (item.publicId === updatedTodo.publicId ? updatedTodo : item));
