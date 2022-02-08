import React, { memo, useCallback } from 'react';
import { NewTodo } from '../models';
import { TodoFormViewComponent } from './todo-form-view.component';
import { todosNewDelete, todosNewInit, todosNewSave } from '../stores/todos';

interface Props {
    todo: NewTodo;
}

export const TodoFormNewComponent = memo(({ todo }: Props) => {
    let handleUpdate = useCallback((todo: NewTodo) => {
        todosNewSave(todo);
    }, []);

    let handleUpdateAndContinue = useCallback((todo: NewTodo) => {
        todosNewSave(todo);
        todosNewInit(todo.order + 1);
    }, []);

    let handleDelete = useCallback((todo: NewTodo) => {
        todosNewDelete(todo);
    }, []);

    return (
        <TodoFormViewComponent
            autoFocus={true}
            todo={todo}
            onUpdate={handleUpdate}
            onUpdateAndContinue={handleUpdateAndContinue}
            onDelete={handleDelete}
        />
    );
});
