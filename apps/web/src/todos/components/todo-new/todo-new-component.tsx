import React, { FormEvent, KeyboardEvent, memo, useCallback, useRef } from 'react';
import { NewTodo } from '../../models';
import { useClickOutside } from 'common-react-hooks';

interface Props {
    onSubmit?: (newTodo: NewTodo | undefined) => unknown;
}

export const TodoNewComponent = memo(({ onSubmit }: Props) => {
    let formRef = useRef<HTMLFormElement | null>(null);

    let handleSubmit = useCallback(() => {
        if (formRef.current == null) {
            return;
        }
        let form = formRef.current;
        let title = form.text.value;
        let completed = form.checked.value === 'on';

        if (title === '') {
            onSubmit?.(undefined);
            return;
        }
        onSubmit?.({
            title,
            completed,
        });
        formRef.current.reset();
    }, [onSubmit]);

    let handleFormSubmit = useCallback(
        (event: FormEvent) => {
            event.preventDefault();
            handleSubmit();
        },
        [handleSubmit]
    );

    let handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    useClickOutside(formRef, handleSubmit);

    return (
        <form ref={formRef} className={`d-flex p-2 align-items-center`} onSubmit={handleFormSubmit}>
            <input type="checkbox" name="checked" className={`me-2`} style={{ transform: 'scale(1.33)' }} />
            <input
                autoFocus={true}
                type="text"
                name="text"
                className={`w-100 p-1 border-bottom`}
                style={{
                    border: 'none',
                    background: 'inherit',
                }}
                onKeyDown={handleKeyDown}
            />
        </form>
    );
});
