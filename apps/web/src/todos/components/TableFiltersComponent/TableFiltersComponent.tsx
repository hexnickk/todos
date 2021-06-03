import React, { memo, useCallback } from 'react';
import './TableFiltersComponent.less';

import { Button, Form, Input, Select } from 'antd';
import { TodosSetFilter } from '/todos/stores';

let { Option } = Select;

interface Props {
    className?: string;
}

export const TableFiltersComponent = memo((props: Props) => {
    let [form] = Form.useForm();

    let onSearchSubmit = (values: any) => {
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
        <div className={props.className}>
            <Form
                className="table-filters"
                form={form}
                initialValues={{ completed: '-' }}
                layout="inline"
                onFinish={onSearchSubmit}
            >
                <Form.Item
                    className="table-filters__field"
                    name="search"
                    label="Search:"
                >
                    <Input placeholder="Keyword..." />
                </Form.Item>
                <Form.Item
                    className="table-filters__field"
                    name="completed"
                    label="Completed:"
                >
                    <Select onChange={onCompletedChange}>
                        <Option value="-">-</Option>
                        <Option value="yes">yes</Option>
                        <Option value="no">no</Option>
                    </Select>
                </Form.Item>
                <Form.Item className="table-filters__field_disabled">
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
});
