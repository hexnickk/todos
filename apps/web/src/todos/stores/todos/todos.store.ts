import { createStore } from 'effector';
import { fetchTodosFx } from './todos.effects';
import { Todos } from '/todos/models';

interface Store {
    todos: Todos;
    loading: boolean;
    error?: string;
}

export let $todos = createStore<Store>({
    todos: [],
    loading: false,
    error: undefined,
});

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
    }));
