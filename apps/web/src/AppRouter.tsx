import React, { memo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const AppRouter = memo(() => (
    <Router>
        <Switch>
            <Route path="/">
                <div>Hello world</div>
            </Route>
        </Switch>
    </Router>
));
