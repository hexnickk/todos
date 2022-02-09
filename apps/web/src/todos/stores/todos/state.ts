import { combine, createStore } from 'effector';
import { NewTodo, Todo } from '../../models';

export let $todosLoading = createStore<boolean>(false);
export let $todosList = createStore<Todo[]>([]);
export let $todosNew = createStore<NewTodo | null>(null);

export let $todosListSorted = combine($todosList, $todosNew, (todosList, todosNew) =>
    todosNew != null ? [...todosList, todosNew] : todosList
).map((state) => state.slice().sort((a, b) => a.order - b.order));

export let $todosListSortedUpcoming = $todosListSorted.map((state) => state.filter((todo) => !todo.completed));
export let $todosListSortedCompleted = $todosListSorted.map((state) => state.filter((todo) => todo.completed));
