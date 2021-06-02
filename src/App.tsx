import React from 'react';
import './App.css';

function App() {
    return (
        <>
            <h1>Docler FE Homework</h1>
            <ul>
                <li>
                    Create the layout based on the designs at the bottom of the
                    task's description
                </li>
                <li>
                    Make sure the layout looks great both on desktop and on
                    mobile
                </li>
                <li>Focus on good UX</li>
                <li>Use React with TypeScript</li>
                <li>Cover the functionality with tests</li>
                <li>
                    Get data for the list from{' '}
                    <a
                        href="https://jsonplaceholder.typicode.com/todos"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://jsonplaceholder.typicode.com/todos
                    </a>{' '}
                    using an asynchronous call
                </li>
                <li>Pay attention to architecture and code organizing</li>
                <li>Feel free to add new dependencies if you need anything</li>
            </ul>
        </>
    );
}

export default App;
