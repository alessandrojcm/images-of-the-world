import { renderHook } from '@testing-library/react-hooks';
import useProgressiveImage from '../src/utils/hooks/useProgressiveImage/useProgressiveImage';

describe.skip('useProgressiveImage testing suite', () => {
    it('should work', () => {
        renderHook(() => useProgressiveImage('aphoto', 250));
    });

    it('should fetch the placeholder', async () => {
        const { result, waitForValueToChange } = renderHook(() => useProgressiveImage('aphoto', 250));
        await waitForValueToChange(() => result.current.placeholderImage);

        expect(result.current.placeholderImage).not.toBeNull();
    });
});
