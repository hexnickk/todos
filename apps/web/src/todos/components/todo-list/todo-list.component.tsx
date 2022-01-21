import React, { memo } from 'react';
import { Todos } from '../../models';
import { TodoFormComponent } from '../todo-form/todo-form.component';

interface Props {
    todos: Todos;
}

export let TodoListComponent = memo((props: Props) => {
    return (
        <>
            {props.todos.map((todo) => (
                <TodoFormComponent key={todo.publicId} todo={todo} />
            ))}
        </>
    );
});
