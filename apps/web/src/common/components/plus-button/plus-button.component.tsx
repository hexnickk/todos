import React, { memo, useCallback } from 'react';

interface Props {
    onClick?: (...args: any[]) => unknown;
}

export const PlusButtonComponent = memo(({ onClick }: Props) => {
    const handleClick = useCallback(() => {
        onClick?.();
    }, [onClick]);

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
                +
            </button>
        </>
    );
});
