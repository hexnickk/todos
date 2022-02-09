import React, { memo, useCallback, useState } from 'react';
import { useStore } from 'effector-react';
import { TodoListComponent, TodoPlaceholderComponent } from '../../components';
import {
    $todosListSorted,
    $todosListSortedCompleted,
    $todosListSortedUpcoming,
    $todosLoading,
    $todosNew,
    todosNewInit,
} from '../../stores/todos';
import { Container } from 'react-bootstrap';
import { PlusButtonComponent } from '../../../common/components';

export const TodosListPage = memo(() => {
    let todos = useStore($todosListSorted);
    let todosUpcoming = useStore($todosListSortedUpcoming);
    let todosCompleted = useStore($todosListSortedCompleted);
    let todosNew = useStore($todosNew);
    let todosLoading = useStore($todosLoading);

    let [showCompleted, setShowCompleted] = useState(false);

    let handleNewClick = useCallback(() => {
        todosNewInit(todos.length);
    }, [todos]);

    return (
        <Container className={'py-2 py-md-5 flex-grow-1 d-flex flex-column'}>
            <h1 className="mb-2 text-primary d-flex justify-content-between align-items-center">
                <span>Todos</span>
                <span>{todosLoading ? '...' : todosUpcoming.length}</span>
            </h1>
            <div className={`d-flex justify-content-between align-items-center border-bottom`}>
                <span className={`text-muted`}>
                    {todosLoading ? '...' : todosCompleted.length.toString()} Completed
                </span>
                <button className={`btn btn-link`} onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? 'Hide' : 'Show'}
                </button>
            </div>
            {todosLoading ? (
                <div className="p-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <TodoListComponent todos={todosUpcoming} />
                    {showCompleted && <TodoListComponent todos={todosCompleted} />}
                    {todosNew == null && <TodoPlaceholderComponent onClick={handleNewClick} />}
                    <PlusButtonComponent onClick={handleNewClick} />
                </>
            )}
        </Container>
    );
});
