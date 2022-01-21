import React, { KeyboardEvent, memo, useCallback, useRef, useState } from 'react';
import { Todo } from '../../models';
import { useClickOutside } from 'common-react-hooks';
import { todosUpdate } from '../../stores';

interface Props {
    todo?: Todo;
}

export const TodoFormComponent = memo(({ todo }: Props) => {
    let [active, setActive] = useState(false);
    let titleRef = useRef<HTMLInputElement | null>(null);
    let formRef = useRef<HTMLFormElement | null>(null);

    let handleSubmit = useCallback(() => {
        let form = formRef.current;
        let title = form?.text.value;
        let completed = form?.checked.checked;

        if (todo) {
            todosUpdate({
                ...todo,
                title,
                completed,
            });
        }
        titleRef.current?.blur();
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

    let handleClickInside = useCallback(() => {
        setActive(true);
    }, []);

    let handleClickOutside = useCallback(() => {
        if (active) {
            setActive(false);
            handleSubmit();
        }
    }, [active, handleSubmit]);

    useClickOutside(titleRef, handleClickOutside);

    return (
        <form ref={formRef} className={`d-flex p-2 align-items-center border-bottom`} onClick={handleClickInside}>
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
                onKeyDown={handleKeyDown}
            />
        </form>
    );
});
