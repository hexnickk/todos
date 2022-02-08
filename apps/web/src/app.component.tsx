import React, { memo, useEffect } from 'react';
import { AppRouter } from './app-router';
import { todosLoadFx } from './todos/stores/todos/effects';

export const App = memo(() => {
    useEffect(() => {
        void todosLoadFx();
    }, []);
    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <AppRouter />
        </div>
    );
});
