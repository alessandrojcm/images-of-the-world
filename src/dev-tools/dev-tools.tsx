import React, { useDebugValue, useEffect, useRef, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Tooltip } from '@reach/tooltip';
import { IoIosConstruct } from 'react-icons/io';
import { getByLabelText, getByRole, getByText } from '@testing-library/dom';
import tw, { css } from 'twin.macro';
import userEvent from '@testing-library/user-event';

import * as reactQuery from 'react-query';
import { ReactQueryDevtoolsPanel } from 'react-query-devtools/dist/react-query-devtools.development';
import '@reach/tabs/styles.css';
import '@reach/tooltip/styles.css';

import { render } from 'react-dom';
import { FillableFixture, fixtures } from './fixtures';

// See: https://github.com/kentcdodds/bookshelf/blob/master/src/dev-tools/dev-tools.js
/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
function useLocalStorageState(key: string, defaultValue: any | CallableFunction = '', { serialize = JSON.stringify, deserialize = JSON.parse } = {}) {
    const [state, setState] = useState(() => {
        const valueInLocalStorage = window.localStorage.getItem(key);
        if (valueInLocalStorage) {
            return deserialize(valueInLocalStorage);
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    });

    useDebugValue(`${key}: ${serialize(state)}`);

    const prevKeyRef = React.useRef(key);

    useEffect(() => {
        const prevKey = prevKeyRef.current;
        if (prevKey !== key) {
            window.localStorage.removeItem(prevKey);
        }
        prevKeyRef.current = key;
    }, [key]);

    useEffect(() => {
        window.localStorage.setItem(key, serialize(state));
    }, [key, state, serialize]);

    return [state, setState];
}

const fillFixtureOnScreen = async (fixture: FillableFixture, rootElement: HTMLElement) => {
    const { action, ...rest } = fixture;
    const errs: string[] = [];

    Object.entries(rest).map(async ([k, v]) => {
        try {
            const node = getByLabelText(rootElement, k);
            await userEvent.type(node, '');
            await userEvent.type(node, v);
        } catch (e) {
            // eslint-disable-next-line no-console
            errs.push(e.toString());
        }
    });

    try {
        let actionNode;

        if (action.element === 'role') {
            actionNode = getByRole(rootElement, action.name);
        } else if (action.element === 'label') {
            actionNode = getByLabelText(rootElement, action.name);
        } else {
            actionNode = getByText(rootElement, action.name);
        }
        await userEvent[action.type](actionNode);
    } catch (e) {
        errs.push(e.toString());
    }
    return errs;
};

const FixtureFiller = () => {
    const rootNode = document.getElementById('root');
    const [errs, setErrs] = useState<string[]>([]);
    if (!rootNode) {
        return <p>App not mounted</p>;
    }

    return (
        <div
            css={css`
                ${tw`flex justify-between items-center bg-orange-100`}
            `}>
            <div
                css={css`
                    ${tw`flex flex-col justify-between items-center`}
                `}>
                {Object.entries(fixtures).map(([k, v]) => {
                    return (
                        <button key={k} type="button" onClick={() => fillFixtureOnScreen(v, rootNode).then(setErrs)}>
                            Fill {` ${k}`}
                        </button>
                    );
                })}
            </div>
            {errs.length > 0 && (
                <div
                    css={css`
                        ${tw`flex flex-col`};
                        max-height: 25vh;
                        max-width: 50%;
                        overflow: auto;
                    `}>
                    {errs.map((err) => (
                        <>
                            <p
                                css={css`
                                    ${tw`text-sm text-primary`}
                                `}>
                                {err}
                            </p>
                            <br />
                        </>
                    ))}
                    <button
                        css={`
                            ${tw`bg-orange-100`}
                        `}
                        type="button"
                        onClick={() => setErrs([])}>
                        Clear errors
                    </button>
                </div>
            )}
        </div>
    );
};

const DevTools = () => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [hovering, setHovering] = useState(false);
    const [persist, setPersist] = useLocalStorageState('__iotw_devtools_persist__', false);
    const [tabIndex, setTabIndex] = useLocalStorageState('__iotw_devtools_tab_index__', 0);

    const show = persist || hovering;
    const toggleShow = () => setPersist((v: boolean) => !v);

    useEffect(() => {
        // @ts-ignore
        function updateHoverState(event: EventTarget<HTMLDivElement>) {
            setHovering(rootRef.current?.contains(event.target) ?? false);
        }
        document.body.addEventListener('mousemove', updateHoverState);
        return () => document.body.removeEventListener('mousemove', updateHoverState);
    }, []);
    return (
        <div
            css={css`
                ${tw`
                    absolute
                    fixed
                    w-full
                `};
                bottom: 1.5rem;
                left: 1.5rem;
                right: 1.5rem;
                max-height: 50%;
                max-width: 95vw;
                overflow: auto;
            `}>
            <div ref={rootRef}>
                <Tooltip label="Toggle Persist DevTools">
                    <button
                        type="button"
                        onClick={toggleShow}
                        css={css`
                            ${tw`flex bg-yellow px-2 flex items-center`}
                        `}>
                        <IoIosConstruct />
                        <p
                            css={css`
                                ${tw`pl-1`}
                            `}>
                            IOTW Devtools
                        </p>
                    </button>
                </Tooltip>
                {show ? (
                    <Tabs index={tabIndex} onChange={(i) => setTabIndex(i)}>
                        <TabList>
                            <Tab
                                css={css`
                                    ${tw`bg-green`}
                                `}>
                                Fixture Filler
                            </Tab>
                            <Tab
                                css={css`
                                    ${tw`bg-yellow`}
                                `}>
                                React Query
                            </Tab>
                        </TabList>
                        <TabPanels css={{ height: '100%' }}>
                            <TabPanel>
                                <FixtureFiller />
                            </TabPanel>
                            <TabPanel>
                                <ReactQueryDevtoolsPanel />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                ) : null}
            </div>
        </div>
    );
};

const install = () => {
    (window as any).reactQuery = reactQuery;
    const devToolsRoot = document.createElement('div');
    document.body.appendChild(devToolsRoot);
    render(<DevTools />, devToolsRoot);
};

export default install;

/*
eslint
  no-unused-expressions: "off",
  import/no-extraneous-dependencies: "off"
*/
