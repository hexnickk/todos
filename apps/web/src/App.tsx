import React from 'react';
import './App.scss';

import { AppRouter } from 'AppRouter';
import { memo } from 'react';

export const App = memo(() => {
    return <AppRouter></AppRouter>;
});
