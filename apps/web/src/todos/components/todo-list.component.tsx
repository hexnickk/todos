import React, { memo } from 'react';
import { NewTodo, Todo, todoIsExisting } from '../models';
import { TodoFormExistingComponent } from './todo-form-existing.component';
import { TodoFormNewComponent } from './todo-form-new.component';

interface Props {
    todos: Array<Todo | NewTodo>;
}

export let TodoListComponent = memo((props: Props) => {
    return (
        <>
            {props.todos.map((todo) =>
                todoIsExisting(todo) ? (
                    <TodoFormExistingComponent key={todo.publicId} todo={todo} />
                ) : (
                    <TodoFormNewComponent key={Math.random().toString()} todo={todo} />
                )
            )}
        </>
    );
});
