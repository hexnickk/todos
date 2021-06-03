import React, { memo } from 'react';

import { Table } from 'antd';
import { Todo, Todos } from '/todos/models';

let columns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'id',
    },
    {
        title: 'Completed',
        dataIndex: 'completed',
        key: 'id',
        render: (completed: Todo['completed']) => (completed ? <span>yes</span> : <span>no</span>),
    },
];

interface Props {
    items: Todos;
}

export let TableComponent = memo((props: Props) => {
    return <Table dataSource={props.items} columns={columns} rowKey="id" />;
});
