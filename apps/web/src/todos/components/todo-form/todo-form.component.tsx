import React, { KeyboardEvent, memo, useCallback, useRef } from 'react';
import { Todo } from '../../models';
import { todosCreate, todosDelete, todosHideForm, todosUpdate } from '../../stores';

interface Props {
    todo?: Todo;
}

export const TodoFormComponent = memo(({ todo }: Props) => {
    let titleRef = useRef<HTMLInputElement | null>(null);
    let formRef = useRef<HTMLFormElement | null>(null);

    let handleSubmit = useCallback(() => {
        let form = formRef.current;
        let title = form?.text.value;
        let completed = form?.checked.checked;

        if (todo != null && title === '') {
            todosDelete(todo);
        } else if (todo != null && title !== '') {
            todosUpdate({
                ...todo,
                title,
                completed,
            });
        } else if (todo == null && title === '') {
            todosHideForm();
        } else if (todo == null && title !== '') {
            todosCreate({
                title,
                completed,
            });
        }

        form?.reset();
    }, [todo]);

    let handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape' || event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    let handleBlur = useCallback(() => {
        handleSubmit();
    }, [handleSubmit]);

    return (
        <form ref={formRef} className={`d-flex p-2 align-items-center border-bottom`}>
            <input type="checkbox" name="checked" className={`me-2`} style={{ transform: 'scale(1.33)' }} />
            <input
                ref={titleRef}
                autoFocus={todo == null}
                type="text"
                name="text"
                className={`w-100 p-1 border-0`}
                style={{
                    background: 'inherit',
                }}
                defaultValue={todo?.title}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        </form>
    );
});
