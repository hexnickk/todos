import React, { memo, useCallback } from 'react';
import { Todo } from '../models';
import { TodoFormViewComponent } from './todo-form-view.component';
import { todosNewInit, todosDelete, todosUpdate } from '../stores/todos';

interface Props {
    todo: Todo;
}

export const TodoFormExistingComponent = memo(({ todo }: Props) => {
    let handleUpdate = useCallback((todo: Todo) => {
        todosUpdate(todo);
    }, []);

    let handleUpdateAndContinue = useCallback((todo: Todo) => {
        todosUpdate(todo);
        todosNewInit(todo.order + 1);
    }, []);

    let handleDelete = useCallback((todo: Todo) => {
        todosDelete(todo);
    }, []);

    return (
        <TodoFormViewComponent
            todo={todo}
            onUpdate={handleUpdate}
            onUpdateAndContinue={handleUpdateAndContinue}
            onDelete={handleDelete}
        />
    );
});
