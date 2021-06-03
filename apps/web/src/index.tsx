import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '/App';
import { sampleFunc } from '@libs/sample';

sampleFunc();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
