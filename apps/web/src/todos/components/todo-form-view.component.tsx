import React, { KeyboardEvent, PropsWithChildren, useCallback, useRef, useState } from 'react';
import { NewTodo, Todo } from '../models';
import { typedMemo } from '../../utils/react';
import { useClickOutside } from 'common-react-hooks';

type ValueType = Todo | NewTodo;

interface Props<T extends ValueType> {
    todo?: T;
    autoFocus?: boolean;
    onUpdate?: (todo: T) => unknown;
    onUpdateAndContinue?: (todo: T) => unknown;
    onDelete?: (todo: T) => unknown;
}

export const TodoFormViewComponent = typedMemo(
    <T extends ValueType>({
        todo,
        autoFocus,
        onUpdate,
        onUpdateAndContinue,
        onDelete,
    }: PropsWithChildren<Props<T>>) => {
        let [active, setActive] = useState(false);
        let formRef = useRef<HTMLFormElement | null>(null);
        let titleRef = useRef<HTMLInputElement | null>(null);

        let handleKeyDown = useCallback(
            (event: KeyboardEvent) => {
                if (todo == null) {
                    return;
                }
                let isEscapeKey = event.key === 'Escape';
                let isEnterKey = event.key === 'Enter';
                let isTabKey = event.key === 'Tab';
                let isSpecialKey = isEscapeKey || isEnterKey || isTabKey;

                let title = formRef.current?.text.value;
                let completed = formRef.current?.checked.checked;

                if (isSpecialKey && title === '') {
                    // We don't need to prevent tabbing out
                    if (isEnterKey || isEscapeKey) {
                        event.preventDefault();
                    }
                    onDelete?.(todo);
                    formRef.current?.reset();
                    return;
                }

                if (isEnterKey) {
                    event.preventDefault();
                    onUpdateAndContinue?.({
                        ...todo,
                        title,
                        completed,
                    });
                    formRef.current?.reset();
                    return;
                }

                if (isEscapeKey) {
                    event.preventDefault();
                    onUpdate?.({
                        ...todo,
                        title,
                        completed,
                    });
                    titleRef.current?.blur();
                    formRef.current?.reset();
                    return;
                }
            },
            [todo, onUpdate, onUpdateAndContinue, onDelete]
        );

        let handleFocus = useCallback(() => {
            setActive(true);
        }, []);

        let handleBlur = useCallback(() => {
            setActive(false);
        }, []);

        let handleClickOutside = useCallback(() => {
            if (todo == null) {
                return;
            }
            if (!active) {
                return;
            }

            let title = formRef.current?.text.value;
            let completed = formRef.current?.checked.checked;
            let isEmptyTitle = title === '';

            if (isEmptyTitle) {
                onDelete?.(todo);
            } else {
                onUpdate?.({
                    ...todo,
                    title,
                    completed,
                });
            }
        }, [active, todo, onDelete, onUpdate]);

        useClickOutside(titleRef, handleClickOutside);

        return (
            <form ref={formRef} className={`d-flex p-2 align-items-center border-bottom`} data-cy="todo-form">
                <input
                    type="checkbox"
                    name="checked"
                    className={`me-2`}
                    style={{ transform: 'scale(1.33)' }}
                    data-cy="todo-form__checked"
                />
                <input
                    ref={titleRef}
                    autoFocus={autoFocus}
                    type="text"
                    name="text"
                    className={`w-100 p-1 border-0`}
                    style={{
                        background: 'inherit',
                    }}
                    defaultValue={todo?.title}
                    data-cy="todo-form__title"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            </form>
        );
    }
);
