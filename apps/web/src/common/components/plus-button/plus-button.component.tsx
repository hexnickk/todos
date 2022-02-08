import React, { memo, MouseEvent, useCallback } from 'react';

interface Props {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown;
}

export const PlusButtonComponent = memo(({ onClick }: Props) => {
    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
        },
        [onClick]
    );

    return (
        <>
            <button
                className={`position-absolute btn btn-success rounded-circle`}
                style={{
                    width: '4rem',
                    height: '4rem',
                    right: '2rem',
                    bottom: '2rem',
                    fontSize: '2rem',
                }}
                onClick={handleClick}
            >
                <i className="bi bi-plus" />
            </button>
        </>
    );
});
