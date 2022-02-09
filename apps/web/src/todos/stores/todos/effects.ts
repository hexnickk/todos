import { createEffect } from 'effector';
import { nanoid } from 'nanoid';
import { Todo } from '../../models';

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

export let todosLoadFx = createEffect(async (): Promise<Todo[]> => {
    // Imitating HTTP request
    return await new Promise((resolve) => {
        setTimeout(() => {
            let rawTodos = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            if (rawTodos == null) {
                resolve(defaultTodos);
                return;
            }
            resolve(JSON.parse(rawTodos));
        }, Math.random() * 2000);
    });
});

export let todosSaveFx = createEffect((todos: Todo[]) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
});
