import React, { memo, useEffect } from 'react';
import { Spin } from 'antd';
import { useStore } from 'effector-react';
import { TableComponent } from '/todos/components/TableComponent';
import { $todos, fetchTodosFx } from '/todos/stores/todos';

export const TodosListPage = memo(() => {
    let todos$ = useStore($todos);
    useEffect(() => {
        fetchTodosFx();
    }, []);

    return (
        <>
            <h1>Todos</h1>
            <Spin spinning={todos$.loading}>
                <TableComponent items={todos$.todos} />
            </Spin>
        </>
    );
});
