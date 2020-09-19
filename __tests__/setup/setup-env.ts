import { server } from './server';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        // Super ad hoc and naive way to mock max-width queries
        // @ts-ignore
        matches: Number(new RegExp('\\d+').exec(query)[0]) <= window.innerWidth,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

beforeAll(() =>
    server.listen({
        onUnhandledRequest: 'error',
    })
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
