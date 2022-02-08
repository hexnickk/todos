import React, { memo, useCallback } from 'react';
import { useStore } from 'effector-react';
import { TodoListComponent, TodoPlaceholderComponent } from '../../components';
import { $todosList, $todosNew, todosCreateNew } from '../../stores/todos';
import { Container } from 'react-bootstrap';
import { PlusButtonComponent } from '../../../common/components';

export const TodosListPage = memo(() => {
    let todos = useStore($todosList);
    let todosNew = useStore($todosNew);

    let handleNewClick = useCallback(() => {
        todosCreateNew();
    }, []);

    return (
        <Container className={'py-2 py-md-5 flex-grow-1 d-flex flex-column'}>
            <h1 className="mb-2">Todos</h1>
            <TodoListComponent todos={todos} />
            {todosNew == null && <TodoPlaceholderComponent onClick={handleNewClick} />}
            <PlusButtonComponent onClick={handleNewClick} />
        </Container>
    );
});
