import { createEffect } from 'effector';
import { TodosStore } from './models';
import { nanoid } from 'nanoid';

export const LOCAL_STORAGE_KEY = 'todos_store';

let defaultTodos = [
    {
        order: 0,
        publicId: nanoid(),
        completed: false,
        title: '✅ Click on the big green button or click anywhere down below 👇',
    },
    {
        order: 1,
        publicId: nanoid(),
        completed: false,
        title: '✅ Try typing "Buy some milk".',
    },
    {
        order: 2,
        publicId: nanoid(),
        completed: false,
        title: '✅ Press "Enter" or click on some empty space again.',
    },
    {
        order: 3,
        publicId: nanoid(),
        completed: false,
        title: '🎉 Now you know how to use the app, good job!',
    },
];

export let todosLoadFx = createEffect(async (): Promise<TodosStore> => {
    let baseStore: TodosStore = {
        todos: defaultTodos,
        newTodo: null,
    };

    // Imitating HTTP request
    return await new Promise((resolve) => {
        setTimeout(() => {
            let rawTodos = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            if (rawTodos == null) {
                resolve(baseStore);
                return;
            }
            resolve({
                ...baseStore,
                todos: JSON.parse(rawTodos),
            });
        }, 1000);
    });
});

export let todosSaveFx = createEffect((store: TodosStore) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.todos));
});
