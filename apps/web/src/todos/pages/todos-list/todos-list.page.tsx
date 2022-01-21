import React, { memo } from 'react';
import { useStore } from 'effector-react';
import { TodoListComponent } from '../../components';
import { $filteredTodos } from '../../stores';
import { Container } from 'react-bootstrap';
import { PlusButtonComponent } from '../../../common/components';

export const TodosListPage = memo(() => {
    let todos$ = useStore($filteredTodos);

    return (
        <Container className={'py-2 py-md-5 flex-grow-1 d-flex flex-column'}>
            <h1 className="mb-2">Todos</h1>
            <TodoListComponent todos={todos$.todos} />
            {/*{showNew && <TodoFormComponent />}*/}
            {/*<TodoPlaceholderComponent onClick={handlePlusButtonClick} />*/}
            <PlusButtonComponent />
        </Container>
    );
});
