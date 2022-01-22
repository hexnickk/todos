import React, { lazy, memo, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SuspenseLoader } from './common/components';

const TodosListPage = lazy(() => import('./todos/pages').then((m) => ({ default: m.TodosListPage })));
const NotFoundPage = lazy(() => import('./common/pages').then((m) => ({ default: m.NotFoundPage })));

export const AppRouter = memo(() => (
    <Suspense fallback={<SuspenseLoader />}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodosListPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
));
