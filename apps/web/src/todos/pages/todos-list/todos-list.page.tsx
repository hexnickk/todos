import React, { memo, useCallback, useState } from 'react';
import { useStore } from 'effector-react';
import { TodoListComponent, TodoNewComponent } from '../../components';
import { $filteredTodos, todosNewItem } from '../../stores';
import { Container } from 'react-bootstrap';
import { PlusButtonComponent } from '../../../common/components';
import { TodoPlaceholderComponent } from '../../components/todo-placeholder/todo-placeholder.component';

export const TodosListPage = memo(() => {
    let [showNew, setShowNew] = useState(false);
    let todos$ = useStore($filteredTodos);

    let handlePlusButtonClick = useCallback(() => {
        setShowNew(true);
    }, [setShowNew]);

    let handleSubmit = useCallback((newTodo) => {
        if (newTodo != null) {
            todosNewItem(newTodo);
        } else {
            setShowNew(false);
        }
    }, []);

    return (
        <Container className={'py-2 py-md-5 flex-grow-1 d-flex flex-column'}>
            <h1 className="text-center mb-2">Todos</h1>
            <TodoListComponent items={todos$.todos} />
            {showNew && <TodoNewComponent onSubmit={handleSubmit} />}
            <TodoPlaceholderComponent onClick={handlePlusButtonClick} />
            <PlusButtonComponent onClick={handlePlusButtonClick} />
        </Container>
    );
});
