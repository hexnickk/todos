import { createEvent } from 'effector';
import { NewTodo, Todo } from '../../models';

export let todosCreate = createEvent<NewTodo>();
export let todosUpdate = createEvent<Todo>();
export let todosCreateNew = createEvent<Todo | NewTodo | undefined>();
export let todosDelete = createEvent<Todo>();
export let todosDeleteNew = createEvent();
