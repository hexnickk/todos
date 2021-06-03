import React, { memo, useCallback } from 'react';

import { Button, Form, Input, Select } from 'antd';
import { TodosSetFilter } from '../stores/todos';

let { Option } = Select;

export const TableFiltersComponent = memo(() => {
    let [form] = Form.useForm();

    let onSearchSubmit = (values: any) => {
        console.log(values);
        TodosSetFilter({ search: values.search });
    };

    let onCompletedChange = useCallback(
        (value: string) =>
            TodosSetFilter({
                completed:
                    value === '-' ? undefined : value === 'yes' ? true : false,
            }),
        []
    );

    return (
        <Form
            form={form}
            initialValues={{ completed: '-' }}
            layout="inline"
            onFinish={onSearchSubmit}
        >
            <Form.Item name="search" label="Search:">
                <Input placeholder="Keyword..." />
            </Form.Item>
            <Form.Item name="completed" label="Completed:">
                <Select onChange={onCompletedChange}>
                    <Option value="-">-</Option>
                    <Option value="yes">yes</Option>
                    <Option value="no">no</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button
                    style={{ display: 'none' }}
                    htmlType="submit"
                    type="primary"
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
});
