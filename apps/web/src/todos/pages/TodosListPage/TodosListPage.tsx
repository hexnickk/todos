import React, { memo, useEffect } from 'react';
import './TodosListPage.less';

import { Spin } from 'antd';
import { useStore } from 'effector-react';
import { TableComponent, TableFiltersComponent } from '/todos/components';
import { $filteredTodos, fetchTodosFx } from '/todos/stores';

export const TodosListPage = memo(() => {
    let todos$ = useStore($filteredTodos);
    useEffect(() => {
        fetchTodosFx();
    }, []);

    return (
        <div className="todos-list">
            <h1 className="todos-list__header">Todos</h1>
            <Spin spinning={todos$.loading}>
                <TableFiltersComponent className="todos-list__filters" />
                <TableComponent items={todos$.todos} />
            </Spin>
        </div>
    );
});
