import React, { memo, useEffect } from 'react';
import { Spin } from 'antd';
import { useStore } from 'effector-react';
import { TableComponent } from '/todos/components/TableComponent';
import { $filteredTodos, fetchTodosFx } from '/todos/stores/todos';
import { TableFiltersComponent } from '/todos/components/TableFiltersComponent';

export const TodosListPage = memo(() => {
    let todos$ = useStore($filteredTodos);
    useEffect(() => {
        fetchTodosFx();
    }, []);

    return (
        <>
            <h1>Todos</h1>
            <Spin spinning={todos$.loading}>
                <TableFiltersComponent />
                <TableComponent items={todos$.todos} />
            </Spin>
        </>
    );
});
