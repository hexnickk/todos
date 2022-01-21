import React, { ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { NewTodo, Todo } from '../../models';
import { useClickOutside } from 'common-react-hooks';

interface Props {
    todo?: Todo;
    onSubmit?: (todo: Todo | NewTodo) => unknown;
}

export const TodoListItemComponent = memo(({ todo, onSubmit }: Props) => {
    let titleRef = useRef<HTMLDivElement | null>(null);
    let [title, setTitle] = useState('');
    useEffect(() => {
        if (todo != null) {
            setTitle(todo?.title);
        }
    }, [todo]);

    let handleSubmit = useCallback(() => {
        onSubmit?.({
            ...(todo || {}),
            title,
            completed: false,
        });
    }, [onSubmit, todo, title]);

    let handleInputEvent = useCallback(
        (event: ChangeEvent<HTMLDivElement>) => {
            setTitle(event.target.innerText);
        },
        [setTitle]
    );

    let handleKeyDownEvent = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Escape' || event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    useClickOutside(titleRef, handleSubmit);

    return (
        <div className={`p-2`}>
            <div className="d-flex align-items-start">
                <div className={`me-2`} style={{ minWidth: '20px' }}>
                    <input type="checkbox" style={{ transform: 'scale(1.33)' }} />
                </div>
                <div
                    ref={titleRef}
                    className={`w-100`}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onInput={handleInputEvent}
                    onKeyDown={handleKeyDownEvent}
                >
                    {todo?.title}
                </div>
            </div>
        </div>
    );
});
