import { useEffect, useState, useCallback } from 'react';
import dequal from 'dequal';

const checkForQueryMatches = (queries: string[]) => {
    const result = queries.map(window.matchMedia);

    return result
        .reduce<number[]>((prv, curr) => {
            const { media, matches } = curr;
            if (!matches) {
                return prv;
            }
            // Extract the number of the query
            // if the query is (max-width: 600px) this will return 600
            const res = new RegExp('\\d+').exec(media);

            return res ? [...prv, Number(res[0])] : prv;
        }, [])
        .sort();
};

/**
 * @description Given an array of media queries, this hook will listen
 * for window resize and return the pixels of the queries that match on ascendant
 * order.
 * @param mediaQueries
 */
const useMatchMedia = (...mediaQueries: string[]) => {
    const [matches, setMatches] = useState<number[]>([]);

    const setMediaMatches = useCallback(() => {
        const results = checkForQueryMatches(mediaQueries);

        setMatches((curr) => {
            // If the matching queries are the same
            // we dont' need to set the state again.
            if (dequal(results, curr)) {
                return curr;
            }
            return results;
        });
    }, [setMatches, mediaQueries]);

    useEffect(() => {
        // Run first time
        setMediaMatches();

        window.addEventListener('resize', setMediaMatches);

        return () => {
            window.removeEventListener('resize', setMediaMatches);
        };
    }, []);

    return matches;
};

export default useMatchMedia;
