import React, { memo } from 'react';
import { NewTodo, Todo } from '../../models';
import { TodoFormComponent } from '../todo-form/todo-form.component';

interface Props {
    todos: Array<Todo | NewTodo>;
}

export let TodoListComponent = memo((props: Props) => {
    return (
        <>
            {props.todos.map((todo) => (
                <TodoFormComponent key={'publicId' in todo ? todo.publicId : 'new-todo'} todo={todo} />
            ))}
        </>
    );
});
