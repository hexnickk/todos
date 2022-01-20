import './todos-list.page.scss';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { TodoListComponent } from '../../components';
import { $filteredTodos, fetchTodosFx, todosNewItem } from '../../stores';
import { Container } from 'react-bootstrap';
import { PlusButtonComponent } from '../../../common/components/plus-button/plus-button.component';
import { TodoNewComponent } from '../../components/todo-new/todo-new-component';

export const TodosListPage = memo(() => {
    let [showNew, setShowNew] = useState(false);
    let todos$ = useStore($filteredTodos);

    useEffect(() => {
        void fetchTodosFx();
    }, []);

    let handleNewItem = useCallback(() => {
        setShowNew(true);
    }, [setShowNew]);

    let handleSubmit = useCallback((newTodo) => {
        todosNewItem(newTodo);
    }, []);

    return (
        <div className="py-2 py-md-5 flex-grow-1">
            <Container>
                <h1 className="text-center mb-2">Todos</h1>
                {/*    <TableFiltersComponent className="list__filters" />*/}
                <TodoListComponent items={todos$.todos} />
                {showNew && <TodoNewComponent onSubmit={handleSubmit} />}
                <PlusButtonComponent onClick={handleNewItem} />
                {/*<Spin spinning={todos$.loading}>*/}
                {/*    {todos$.error ? <Alert message={todos$.error} type="error" /> : <></>}*/}
                {/*</Spin>*/}
            </Container>
        </div>
    );
});
