import { createEvent, createStore } from 'effector';
import { fetchTodosFx } from './todos.effects';
import { Todos } from '/todos/models';

interface Store {
    filters: {
        search?: string;
        completed?: boolean;
    };
    todos: Todos;
    loading: boolean;
    error?: string;
}

export let TodosSetFilter = createEvent<Store['filters']>();

export let $todos = createStore<Store>({
    filters: {
        search: undefined,
        completed: undefined,
    },
    todos: [],
    loading: false,
    error: undefined,
});

export const $filteredTodos = $todos.map((state) => ({
    ...state,
    todos: state.todos
        .filter(
            (todo) =>
                state.filters.search === undefined ||
                // TODO: replace with fuzzy search
                todo.title.toLowerCase().includes(state.filters.search.toLowerCase())
        )
        .filter((todo) => state.filters.completed === undefined || todo.completed === state.filters.completed),
}));

$todos
    .on(fetchTodosFx.pending, (state, pending) => ({
        ...state,
        loading: pending,
    }))
    .on(fetchTodosFx.failData, (state, error) => ({
        ...state,
        // TODO: get error from response
        error: 'Some error!',
    }))
    .on(fetchTodosFx.doneData, (state, todos) => ({
        ...state,
        todos,
        error: undefined,
    }))
    .on(TodosSetFilter, (state, filters) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    }));

$todos.watch((state) => {
    console.log('todos:', state);
});
