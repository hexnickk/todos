import React, { memo, useEffect } from 'react';
import './todos-list.page.less';

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
        <div data-scope="todos-list">
            <div className="list">
                <h1 className="list__header">Todos</h1>
                <Spin spinning={todos$.loading}>
                    <TableFiltersComponent className="list__filters" />
                    <TableComponent items={todos$.todos} />
                </Spin>
            </div>
        </div>
    );
});
