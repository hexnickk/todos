import { createStore } from 'effector';
import { NewTodo, Todo, todoFromNew } from '../../models';
import { nanoid } from 'nanoid';
import { todosCreate, todosCreateNew, todosDelete, todosDeleteNew, todosUpdate } from './todos.events';

export interface TodosStore {
    todos: Todo[];
    newTodo: NewTodo | null;
}

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

export let $todosStore = createStore<TodosStore>({
    todos: [
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
    ],
    newTodo: null,
});

export let $todosList = $todosStore
    .map((state) => (state.newTodo != null ? [...state.todos, state.newTodo] : state.todos))
    .map((state) => state.slice().sort((a, b) => a.order - b.order));

export let $todosNew = $todosStore.map((state) => state.newTodo);

$todosStore
    .on(todosCreateNew, (state, todo) => {
        if (todo == null) {
            let lastOrder = state.todos.reduce((acc, cur) => (cur.order > acc ? cur.order : acc), -1);
            return {
                ...state,
                newTodo: {
                    order: lastOrder,
                    completed: false,
                    title: '',
                },
            };
        }
        return {
            ...state,
            todos: incOrder(state.todos, todo.order),
            newTodo: {
                order: todo.order + 1,
                completed: false,
                title: '',
            },
        };
    })
    .on(todosUpdate, (state, updatedTodo) => ({
        ...state,
        todos: update(state.todos, updatedTodo),
    }))
    .on(todosCreate, (state, newTodo) => {
        let todo = todoFromNew(newTodo);
        return {
            ...state,
            todos: [...state.todos, todo],
            newTodo: null,
        };
    })
    .on(todosDelete, (state, deletedTodo) => ({
        ...state,
        todos: decOrder(
            state.todos.reduce((acc: Todo[], cur) => (cur.publicId === deletedTodo.publicId ? acc : [...acc, cur]), []),
            deletedTodo.order
        ),
    }))
    .on(todosDeleteNew, (state) => ({
        ...state,
        todos: state.newTodo ? decOrder(state.todos, state.newTodo?.order) : state.todos,
        newTodo: null,
    }));

$todosStore.watch((state) => console.log(JSON.stringify(state, null, 2)));
