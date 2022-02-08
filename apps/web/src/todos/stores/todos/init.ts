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
$todosNew.on(todosNewSave, () => null);

// $todosListSorted.watch((list) => console.log(JSON.stringify(list, null, 2)));
