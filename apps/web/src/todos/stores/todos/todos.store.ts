import { createEvent, createStore } from 'effector';
import { NewTodo, Todo, todoFromNew } from '../../models';
import { nanoid } from 'nanoid';

export interface TodosStore {
    filters: {
        completed?: boolean;
    };
    todos: Todo[];
    newTodo: NewTodo | undefined;
}

// --- UTILS ---
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

// --- EVENTS ---
export let todosCreate = createEvent<NewTodo>();
export let todosUpdate = createEvent<Todo>();
export let todosNew = createEvent<Todo | NewTodo>();
export let todosDelete = createEvent<Todo>();
export let todosDeleteNew = createEvent();

let $todosStore = createStore<TodosStore>({
    filters: {
        completed: undefined,
    },
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
    newTodo: undefined,
});

export let $todosList = $todosStore
    .map((state) => (state.newTodo != null ? [...state.todos, state.newTodo] : state.todos))
    .map((state) => state.slice().sort((a, b) => a.order - b.order));

$todosStore
    .on(todosNew, (state, todo) => ({
        ...state,
        todos: incOrder(state.todos, todo.order),
        newTodo: {
            order: todo.order + 1,
            completed: false,
            title: '',
        },
    }))
    .on(todosUpdate, (state, updatedTodo) => ({
        ...state,
        todos: update(state.todos, updatedTodo),
    }))
    .on(todosCreate, (state, newTodo) => {
        let todo = todoFromNew(newTodo);
        return {
            ...state,
            todos: [...state.todos, todo],
            newTodo: undefined,
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
        newTodo: undefined,
    }));

// TODO: Remove later
$todosStore.watch((state) => console.log(JSON.stringify(state, null, 2)));
