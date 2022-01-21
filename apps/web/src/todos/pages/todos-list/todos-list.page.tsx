import React, { memo, useCallback } from 'react';
import { useStore } from 'effector-react';
import { TodoFormComponent, TodoListComponent, TodoPlaceholderComponent } from '../../components';
import { $filteredTodos, todosShowForm } from '../../stores';
import { Container } from 'react-bootstrap';
import { PlusButtonComponent } from '../../../common/components';

export const TodosListPage = memo(() => {
    let todos$ = useStore($filteredTodos);

    let handleNewClick = useCallback(() => {
        console.log('click');
        todosShowForm();
    }, []);

    return (
        <Container className={'py-2 py-md-5 flex-grow-1 d-flex flex-column'}>
            <h1 className="mb-2">Todos</h1>
            <TodoListComponent todos={todos$.todos} />
            {todos$.showCreateForm ? <TodoFormComponent /> : <TodoPlaceholderComponent onClick={handleNewClick} />}
            <PlusButtonComponent onClick={handleNewClick} />
        </Container>
    );
});
