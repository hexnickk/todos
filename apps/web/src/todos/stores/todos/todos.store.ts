import { createEvent, createStore } from 'effector';
import { NewTodo, Todo, Todos } from '../../models';
import { nanoid } from 'nanoid';

export interface TodosStore {
    filters: {
        completed?: boolean;
    };
    todos: Todos;
    showCreateForm: boolean;
}

export let todosSetFilter = createEvent<TodosStore['filters']>();
export let todosCreate = createEvent<NewTodo>();
export let todosUpdate = createEvent<Todo>();
export let todosDelete = createEvent<Todo>();
export let todosShowForm = createEvent();
export let todosHideForm = createEvent();

export let $todos = createStore<TodosStore>({
    filters: {
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
    showCreateForm: false,
});

export const $filteredTodos = $todos.map((state) => ({
    ...state,
    todos: state.todos.filter(
        (todo) => state.filters.completed === undefined || todo.completed === state.filters.completed
    ),
}));

$todos
    .on(todosCreate, (state, createdTodo) => {
        let todo: Todo = {
            ...createdTodo,
            publicId: nanoid(),
        };
        return {
            ...state,
            todos: [...state.todos, todo],
        };
    })
    .on(todosUpdate, (state, updatedTodo) => ({
        ...state,
        todos: state.todos.map((todo) => (todo.publicId === updatedTodo.publicId ? updatedTodo : todo)),
    }))
    .on(todosDelete, (state, deletedTodo) => ({
        ...state,
        todos: state.todos.reduce(
            (acc: Todos, cur) => (cur.publicId === deletedTodo.publicId ? acc : [...acc, cur]),
            []
        ),
    }))
    .on(todosShowForm, (state) => ({ ...state, showCreateForm: true }))
    .on(todosHideForm, (state) => ({ ...state, showCreateForm: false }));

// TODO: Remove later
$todos.watch((state) => console.log(state.todos));
