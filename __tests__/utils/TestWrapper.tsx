import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';

import '../../src/core/i18n';
import JourneyContext from '../../src/context/JourneyStateContext';
import CurrentUserContext from '../../src/context/CurrentUserContext/CurrentUserContext';

// eslint-disable-next-line react/require-default-props
export const TestWrapper = ({ children, initialEntries = [''] }: { children: React.ReactNode; initialEntries?: string[] }) => (
    <Suspense fallback="Loading...">
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </Suspense>
);

export const CurrentUserWrapper: React.FC = ({ children }) => (
    <TestWrapper initialEntries={['/journey']}>
        <CurrentUserContext>{children}</CurrentUserContext>
    </TestWrapper>
);

// eslint-disable-next-line react/require-default-props
export const TestJourneyContextWrapper: React.FC = ({ children }) => (
    <TestWrapper initialEntries={['/journey/start']}>
        <CurrentUserContext>
            <JourneyContext journeyId="aid">{children}</JourneyContext>
        </CurrentUserContext>
    </TestWrapper>
);

export default TestWrapper;
