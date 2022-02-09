import { createEffect } from 'effector';
import { nanoid } from 'nanoid';
import { Todo } from '../../models';

export const LOCAL_STORAGE_KEY = 'todos_store';

let defaultTodos = [
    {
        order: 0,
        publicId: nanoid(),
        completed: false,
        title: 'Step 1. Create a new note by clicking on the big green button or clicking anywhere down below 👇',
    },
    {
        order: 1,
        publicId: nanoid(),
        completed: false,
        title: 'Step 2. Edit a new note by typing "Buy some milk".',
    },
    {
        order: 2,
        publicId: nanoid(),
        completed: false,
        title: 'Step 3. Save a new note by pressing "Enter" or clicking on some empty space again.',
    },
    {
        order: 3,
        publicId: nanoid(),
        completed: false,
        title: "Step 4. That's it, simple and efficient! Also it works on mobile as well 👍",
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
        }, Math.random() * 800 + 200);
    });
});

export let todosSaveFx = createEffect((todos: Todo[]) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
});
