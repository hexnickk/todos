import React, { ChangeEvent, memo, useCallback, useState } from 'react';
import './table-filters.component.less';

import { Button, Form, Input, Select } from 'antd';
import { TodosSetFilter } from '/todos/stores';
import { useDebounceValue } from '@libs/hooks';
import { useEffect } from 'react';

let { Option } = Select;

interface Props {
    className?: string;
}

export const TableFiltersComponent = memo((props: Props) => {
    let [search, setSearch] = useState('');
    let debouncedSearch = useDebounceValue<string>(search, 200);

    useEffect(() => {
        TodosSetFilter({ search: debouncedSearch });
    }, [debouncedSearch]);

    let formSubmitHandler = useCallback(() => {
        TodosSetFilter({ search });
    }, [search]);

    let completedChangeHandler = useCallback(
        (value: string) =>
            TodosSetFilter({
                completed: value === '-' ? undefined : value === 'yes' ? true : false,
            }),
        []
    );

    let searchChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value),
        [setSearch]
    );

    return (
        <div data-scope="table-filters" className={props.className}>
            <Form className="filters" layout="inline" onFinish={formSubmitHandler}>
                <Form.Item
                    data-cy="todos-table-filters__search"
                    className="filters__field"
                    name="search"
                    label="Search:"
                >
                    <Input placeholder="Keyword..." onChange={searchChangeHandler} />
                </Form.Item>
                <Form.Item
                    data-cy="todos-table-filters__completed"
                    className="filters__field"
                    name="completed"
                    label="Completed:"
                >
                    <Select defaultValue="-" onChange={completedChangeHandler}>
                        <Option value="-">-</Option>
                        <Option value="yes">yes</Option>
                        <Option value="no">no</Option>
                    </Select>
                </Form.Item>
                <Form.Item className="filters__field_disabled">
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
});
