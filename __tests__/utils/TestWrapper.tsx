import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';

import '../../src/core/i18n';
import JourneyContext from '../../src/context/JourneyStateContext';

// eslint-disable-next-line react/require-default-props
const TestWrapper = ({ children, initialEntries = [''] }: { children: React.ReactNode; initialEntries?: string[] }) => (
    <Suspense fallback="Loading...">
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </Suspense>
);

// eslint-disable-next-line react/require-default-props
export const TestJourneyContextWrapper: React.FC = ({ children }) => (
    <TestWrapper initialEntries={['/journey/start']}>
        <JourneyContext>{children}</JourneyContext>
    </TestWrapper>
);

export default TestWrapper;
