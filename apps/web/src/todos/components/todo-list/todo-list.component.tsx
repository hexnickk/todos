import React, { memo } from 'react';
import { Todos } from '../../models';

interface Props {
    items: Todos;
}

export let TodoListComponent = memo((props: Props) => {
    return (
        <>
            {props.items.map((item) => (
                <div key={item.publicId} className={`p-2`}>
                    <div className="d-flex align-items-start">
                        <div className={`me-2`} style={{ minWidth: '20px' }}>
                            <input type="checkbox" style={{ transform: 'scale(1.33)' }} />
                        </div>
                        <div>{item.title}</div>
                    </div>
                </div>
            ))}
        </>
    );
});
