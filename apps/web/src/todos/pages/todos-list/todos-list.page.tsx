import React, { memo, useCallback, useState } from 'react';
import { useStore } from 'effector-react';
import { TodoListComponent, TodoNewComponent } from '../../components';
import { $filteredTodos, todosNewItem } from '../../stores';
import { Container } from 'react-bootstrap';
import { PlusButtonComponent } from '../../../common/components';

export const TodosListPage = memo(() => {
    let [showNew, setShowNew] = useState(false);
    let todos$ = useStore($filteredTodos);

    let handleNewItem = useCallback(() => {
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
        <div className="py-2 py-md-5 flex-grow-1">
            <Container>
                <h1 className="text-center mb-2">Todos</h1>
                <TodoListComponent items={todos$.todos} />
                {showNew && <TodoNewComponent onSubmit={handleSubmit} />}
                <PlusButtonComponent onClick={handleNewItem} />
            </Container>
        </div>
    );
});
