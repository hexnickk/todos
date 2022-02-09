import React, { ChangeEvent, KeyboardEvent, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
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

        let [title, setTitle] = useState('');
        useEffect(() => {
            if (todo != null) {
                setTitle(todo.title);
            }
        }, [todo]);

        let formRef = useRef<HTMLFormElement | null>(null);
        let titleRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (autoFocus) {
                titleRef.current?.focus();
            }
        }, [todo, autoFocus]);

        let handleKeyDown = useCallback(
            (event: KeyboardEvent) => {
                if (todo == null) {
                    return;
                }
                let isEscapeKey = event.key === 'Escape';
                let isEnterKey = event.key === 'Enter';
                let isTabKey = event.key === 'Tab';
                let isSpecialKey = isEscapeKey || isEnterKey || isTabKey;

                if (isSpecialKey && title === '') {
                    // We don't need to prevent tabbing out
                    if (isEnterKey || isEscapeKey) {
                        event.preventDefault();
                    }
                    onDelete?.(todo);
                    return;
                }

                if (isEnterKey) {
                    event.preventDefault();
                    onUpdateAndContinue?.({
                        ...todo,
                        title,
                    });
                    return;
                }

                if (isEscapeKey) {
                    event.preventDefault();
                    onUpdate?.({
                        ...todo,
                        title,
                    });
                    titleRef.current?.blur();
                    return;
                }
            },
            [title, todo, onUpdate, onUpdateAndContinue, onDelete]
        );

        let handleCheckboxChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                if (todo == null) {
                    return;
                }
                onUpdate?.({ ...todo, completed: event.currentTarget.checked });
            },
            [todo, onUpdate]
        );

        let handleTitleChange = useCallback((event: ChangeEvent<HTMLDivElement>) => {
            let title = event.currentTarget.textContent;
            if (title != null) {
                setTitle(title);
            }
        }, []);

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

            let isEmptyTitle = title === '';

            if (isEmptyTitle) {
                onDelete?.(todo);
            } else {
                onUpdate?.({
                    ...todo,
                    title,
                });
            }
        }, [title, active, todo, onDelete, onUpdate]);

        useClickOutside(titleRef, handleClickOutside);

        return (
            <form ref={formRef} className={`d-flex align-items-center`} data-cy="todo-form">
                <input
                    type="checkbox"
                    name="checked"
                    className={`me-3`}
                    style={{ transform: 'scale(1.33)' }}
                    data-cy="todo-form__checked"
                    defaultChecked={todo?.completed}
                    onChange={handleCheckboxChange}
                />
                <div
                    ref={titleRef}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className={`w-100 py-3 px-1 border-0 border-bottom`}
                    data-cy="todo-form__title"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onInput={handleTitleChange}
                    onKeyDown={handleKeyDown}
                >
                    {todo?.title}
                </div>
            </form>
        );
    }
);
