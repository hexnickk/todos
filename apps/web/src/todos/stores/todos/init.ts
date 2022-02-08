import { forward } from 'effector';
import { todosLoadFx, todosSaveFx } from './effects';
import { $todosList, $todosNew } from './state';
import { todosDelete, todosNewDelete, todosNewInit, todosNewSave, todosUpdate } from './events';
import { decOrder, incOrder, update } from './utils';
import { Todo, todoFromNew } from '../../models';

forward({
    from: $todosList,
    to: todosSaveFx,
});

forward({
    from: todosLoadFx.doneData,
    to: $todosList,
});

$todosList.on(todosUpdate, (list, updatedTodo) => update(list, updatedTodo));

$todosList.on(todosDelete, (list, deletedTodo) =>
    list.reduce((acc: Todo[], cur) => (cur.publicId === deletedTodo.publicId ? acc : [...acc, cur]), [])
);

$todosList.on(todosNewInit, (list, order) => incOrder(list, order));
$todosNew.on(todosNewInit, (_, order) => ({
    order,
    completed: false,
    title: '',
}));

$todosList.on(todosNewDelete, (list, newTodo) => decOrder(list, newTodo.order));
$todosNew.on(todosNewDelete, () => null);

$todosList.on(todosNewSave, (list, newTodo) => {
    let todo = todoFromNew(newTodo);
    return [...list, todo];
});
$todosNew.on(todosNewSave, (_, newTodo) => null);

// $todosStore
//     .on(todosCreateNew, (state, todo) => {
//         if (todo == null) {
//             let lastOrder = state.todos.reduce((acc, cur) => (cur.order > acc ? cur.order : acc), -1);
//             return {
//                 ...state,
//                 newTodo: {
//                     order: lastOrder,
//                     completed: false,
//                     title: '',
//                 },
//             };
//         }
//         return {
//             ...state,
//             todos: incOrder(state.todos, todo.order),
//             newTodo: {
//                 order: todo.order + 1,
//                 completed: false,
//                 title: '',
//             },
//         };
//     })
//     .on(todosCreate, (state, newTodo) => {
//         let todo = todoFromNew(newTodo);
//         return {
//             ...state,
//             todos: [...state.todos, todo],
//             newTodo: null,
//         };
//     })
//     .on(todosDelete, (state, deletedTodo) => ({
//         ...state,
//         todos: decOrder(
//             state.todos.reduce((acc: Todo[], cur) => (cur.publicId === deletedTodo.publicId ? acc : [...acc, cur]), []),
//             deletedTodo.order
//         ),
//     }))
//     .on(todosDeleteNew, (state) => ({
//         ...state,
//         todos: state.newTodo ? decOrder(state.todos, state.newTodo?.order) : state.todos,
//         newTodo: null,
//     }));
