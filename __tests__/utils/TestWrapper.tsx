import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';

export default ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback="Loading...">
        <MemoryRouter>{children}</MemoryRouter>
    </Suspense>
);
