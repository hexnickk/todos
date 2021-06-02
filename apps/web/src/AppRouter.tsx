import { SuspenseLoader } from 'common/components/SuspenseLoader/SuspenseLoader';
import React, { lazy, memo, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const TodosListPage = lazy(() =>
    import('todos/pages').then((m) => ({ default: m.TodosListPage }))
);
const NotFoundPage = lazy(() =>
    import('common/pages').then((m) => ({ default: m.NotFoundPage }))
);

export const AppRouter = memo(() => (
    <Router>
        <Suspense fallback={<SuspenseLoader/>}>
            <Switch>
                <Route exact path="/" component={TodosListPage} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </Suspense>
    </Router>
));
