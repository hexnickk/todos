import { createStore } from 'effector';
import { Todo, todoFromNew } from '../../models';
import { todosCreate, todosCreateNew, todosDelete, todosDeleteNew, todosUpdate } from './events';
import { TodosStore } from './models';
import { decOrder, incOrder, update } from './utils';

export let $todosStore = createStore<TodosStore>({
    todos: [],
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
