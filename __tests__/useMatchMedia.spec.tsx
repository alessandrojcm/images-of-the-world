import { renderHook, act } from '@testing-library/react-hooks';
import useMatchMedia from '../src/utils/hooks/useProgressiveImage/useMatchMedia';

// See: https://stackoverflow.com/questions/46221210/jest-enzyme-how-to-test-at-different-viewports
// JSDOM does not define resizeBy
const resizeWindow = (x: number, y: number, omitEvent = false) => {
    // @ts-ignore
    window.innerWidth = x;
    // @ts-ignore
    window.innerHeight = y;

    if (omitEvent) {
        return;
    }
    window.dispatchEvent(new Event('resize'));
};

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

describe('useMatchMediaTestSuite', () => {
    afterEach(() => {
        resizeWindow(1024, 768, true);
    });

    it('Should work', () => {
        renderHook(() => useMatchMedia('(max-width: 600px)'));
    });

    it('Should return px', () => {
        const { result } = renderHook(() => useMatchMedia('(max-width: 600px)'));
        expect(result.current).toContain(600);
    });

    it('Should not return not matching px', () => {
        const { result } = renderHook(() => useMatchMedia('(max-width: 600px)', '(max-width: 1200px)'));
        expect(result.current).not.toContain(1200);
    });

    it('Should return px in ascending order', () => {
        resizeWindow(5000, 5000);

        const { result } = renderHook(() => useMatchMedia('(max-width: 600px)', '(max-width: 1200px)'));
        expect(result.current).toEqual([1200, 600]);
    });

    it('Should re-evaluate if window size changes', () => {
        const { result, rerender } = renderHook(() => useMatchMedia('(max-width: 600px)', '(max-width: 1200px)'));
        expect(result.current).toEqual([600]);

        act(() => resizeWindow(5000, 5000));
        rerender();

        expect(result.current).toEqual([1200, 600]);
    });
});
