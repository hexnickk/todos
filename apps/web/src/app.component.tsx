import React, { memo } from 'react';
import { AppRouter } from './app-router';

export const App = memo(() => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <AppRouter />
        </div>
    );
});
