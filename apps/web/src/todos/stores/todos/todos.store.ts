import { createEvent, createStore } from 'effector';
// import { fetchTodosFx } from './todos.effects';
import { NewTodo, Todo, Todos } from '../../models';
import { nanoid } from 'nanoid';

export interface TodosStore {
    filters: {
        search?: string;
        completed?: boolean;
    };
    todos: Todos;
    loading: boolean;
    error?: string;
}

export let todosSetFilter = createEvent<TodosStore['filters']>();
export let todosNewItem = createEvent<NewTodo>();

export let $todos = createStore<TodosStore>({
    filters: {
        search: undefined,
        completed: undefined,
    },
    todos: [
        {
            publicId: nanoid(),
            completed: false,
            title: '✅ Click on the big green button or click anywhere down below 👇',
        },
        {
            publicId: nanoid(),
            completed: false,
            title: '✅ Try typing "Buy some milk".',
        },
        {
            publicId: nanoid(),
            completed: false,
            title: '✅ Press "Enter" or click on some empty space again.',
        },
        {
            publicId: nanoid(),
            completed: false,
            title: '🎉 Now you know how to use the app, good job!',
        },
    ],
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
    // .on(fetchTodosFx.pending, (state, pending) => ({
    //     ...state,
    //     loading: pending,
    // }))
    // .on(fetchTodosFx.failData, (state, error) => ({
    //     ...state,
    //     // TODO: get error from response
    //     error: 'Some error!',
    // }))
    // .on(fetchTodosFx.doneData, (state, todos) => ({
    //     ...state,
    //     todos,
    //     error: undefined,
    // }))
    .on(todosNewItem, (state, newTodo) => {
        let todo: Todo = {
            ...newTodo,
            publicId: nanoid(),
        };
        return { ...state, todos: [...state.todos, todo] };
    })
    .on(todosSetFilter, (state, filters) => {
        return {
            ...state,
            filters: { ...state.filters, ...filters },
        };
    });
