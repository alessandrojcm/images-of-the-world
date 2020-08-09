import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';

import '../../src/core/i18n';

export default ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback="Loading...">
        <MemoryRouter>{children}</MemoryRouter>
    </Suspense>
);
