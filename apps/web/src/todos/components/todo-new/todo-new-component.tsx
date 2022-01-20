import React, { FormEvent, memo, useCallback, useRef } from 'react';
import { NewTodo } from '../../models';
import { useClickOutside } from 'common-react-hooks';

interface Props {
    onSubmit?: (newTodo: NewTodo | undefined) => unknown;
}

export const TodoNewComponent = memo(({ onSubmit }: Props) => {
    let formRef = useRef<HTMLFormElement | null>(null);

    let handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit?.({
                title: event.currentTarget.text.value,
                completed: event.currentTarget.checked.value === 'on',
            });
            event.currentTarget.reset();
        },
        [onSubmit]
    );

    let handleClickOutside = useCallback(() => {
        onSubmit?.(undefined);
    }, [onSubmit]);

    useClickOutside(formRef, handleClickOutside);

    return (
        <form ref={formRef} className={`d-flex p-2 align-items-center`} onSubmit={handleSubmit}>
            <input type="checkbox" name="checked" className={`me-2`} style={{ transform: 'scale(1.33)' }} />
            <input
                type="text"
                name="text"
                className={`w-100 p-1 border-bottom`}
                style={{
                    border: 'none',
                    background: 'inherit',
                }}
            />
        </form>
    );
});
