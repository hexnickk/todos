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
                    <div className="d-flex align-items-center">
                        <div className={`me-2`} style={{ width: '20px' }}>
                            <input type="checkbox" style={{ transform: 'scale(1.33)' }} />
                        </div>
                        <span>{item.title}</span>
                    </div>
                </div>
            ))}
        </>
    );
});
