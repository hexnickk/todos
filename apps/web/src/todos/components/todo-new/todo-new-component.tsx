import React, { ChangeEvent, memo, useCallback } from 'react';
import { NewTodo } from '../../models';

interface Props {
    onSubmit?: (newTodo: NewTodo) => unknown;
}

export const TodoNewComponent = memo(({ onSubmit }: Props) => {
    let handleSubmit = useCallback(
        (event: ChangeEvent<HTMLFormElement & any>) => {
            event.preventDefault();
            onSubmit?.({
                title: event.target.title.value,
                completed: event.target.checked.value == 'on',
            });
            event.target.reset();
        },
        [onSubmit]
    );

    return (
        <form className={`d-flex p-2 align-items-center`} onSubmit={handleSubmit}>
            <input type="checkbox" name="checked" className={`me-2`} style={{ transform: 'scale(1.33)' }} />
            <input
                type="text"
                name="title"
                className={`w-100 p-1 border-bottom`}
                style={{
                    border: 'none',
                    background: 'inherit',
                }}
            />
        </form>
    );
});
