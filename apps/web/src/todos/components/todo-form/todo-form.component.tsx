import React, { KeyboardEvent, memo, useCallback, useRef, useState } from 'react';
import { NewTodo, Todo, todoIsNew, todoIsRegular } from '../../models';
import { todosCreate, todosDelete, todosDeleteNew, todosCreateNew, todosUpdate } from '../../stores';
import { useClickOutside } from 'common-react-hooks';

interface Props {
    todo: Todo | NewTodo;
}

let handleDelete = (todo: Todo | NewTodo) => {
    if (todoIsRegular(todo)) {
        todosDelete(todo);
    } else {
        todosDeleteNew();
    }
};

export const TodoFormComponent = memo(({ todo }: Props) => {
    let [active, setActive] = useState(false);
    let formRef = useRef<HTMLFormElement | null>(null);
    let titleRef = useRef<HTMLInputElement | null>(null);

    let handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            let isEscapeKey = event.key === 'Escape';
            let isEnterKey = event.key === 'Enter';
            let isTabKey = event.key === 'Tab';
            let isSpecialKey = isEscapeKey || isEnterKey || isTabKey;

            if (isSpecialKey) {
                if (isEscapeKey || isEnterKey) {
                    event.preventDefault();
                }

                let title = formRef.current?.text.value;
                let completed = formRef.current?.checked.checked;
                let isEmptyTitle = title === '';

                if (isEmptyTitle) {
                    handleDelete(todo);
                } else {
                    if (todoIsRegular(todo)) {
                        let updatedTodo = {
                            ...todo,
                            title,
                            completed,
                        };
                        todosUpdate(updatedTodo);
                        if (isEscapeKey) {
                            titleRef.current?.blur();
                        }
                        if (isEnterKey) {
                            todosCreateNew(updatedTodo);
                        }
                    } else {
                        let newTodo = {
                            ...todo,
                            title,
                            completed,
                        };
                        todosCreate(newTodo);
                        if (isEnterKey) {
                            todosCreateNew(newTodo);
                        }
                    }
                }

                formRef.current?.reset();
            }
        },
        [todo]
    );

    let handleFocus = useCallback(() => {
        setActive(true);
    }, []);

    let handleBlur = useCallback(() => {
        setActive(false);
    }, []);

    let handleClickOutside = useCallback(() => {
        if (!active) {
            return;
        }

        let title = formRef.current?.text.value;
        let completed = formRef.current?.checked.checked;
        let isEmptyTitle = title === '';

        if (isEmptyTitle) {
            handleDelete(todo);
        } else {
            if (todoIsRegular(todo)) {
                let updatedTodo = {
                    ...todo,
                    title,
                    completed,
                };
                todosUpdate(updatedTodo);
            } else {
                let newTodo = {
                    ...todo,
                    title,
                    completed,
                };
                todosCreate(newTodo);
            }
        }
    }, [active, todo]);

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
                autoFocus={todoIsNew(todo)}
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
});
