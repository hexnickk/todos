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
        <Container className={'p-3 py-md-5 px-md-0 flex-grow-1 d-flex flex-column'}>
            <h1 className="m-0 text-primary d-flex justify-content-between align-items-center">
                <span>Todos</span>
                <span data-cy="upcoming-number">{todosLoading ? '...' : todosUpcoming.length}</span>
            </h1>
            <div className={`py-3 d-flex justify-content-between align-items-center border-bottom`}>
                <span data-cy="completed-number" className={`text-muted`}>
                    {todosLoading ? '...' : todosCompleted.length.toString()} Completed
                </span>
                <button
                    className={`btn btn-link p-0`}
                    data-cy="show-completed"
                    onClick={() => setShowCompleted(!showCompleted)}
                >
                    {showCompleted ? 'Hide' : 'Show'}
                </button>
            </div>
            {todosLoading ? (
                <div className="p-3">
                    <div data-cy="spinner" className="spinner-border" role="status">
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
