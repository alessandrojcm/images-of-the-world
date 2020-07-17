import React from 'react';
import tw, { css } from 'twin.macro';
import styled from '@emotion/styled';

const LoaderContainer = styled.div`
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: none;
`;

const LoaderInner = styled.div`
    @keyframes ldio-zxmap36gz5 {
        0% {
            transform: scale(1.1500000000000001);
        }
        100% {
            transform: scale(1);
        }
    }

    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */

    div {
        box-sizing: content-box;
    }

    div {
        position: absolute;
        width: 80px;
        height: 80px;
        top: 13.333333333333336px;
        left: 13.333333333333336px;
        background: #aa1d4e;
        animation: ldio-zxmap36gz5 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        animation-delay: -0.3s;
    }

    div:nth-child(2) {
        top: 13.333333333333336px;
        left: 106.66666666666666px;
        background: #eeeee3;
        animation-delay: -0.2s;
    }

    div:nth-child(3) {
        top: 106.66666666666666px;
        left: 13.333333333333336px;
        background: #dcd3b6;
        animation-delay: 0s;
    }

    div:nth-child(4) {
        top: 106.66666666666666px;
        left: 106.66666666666666px;
        background: #cdc569;
        animation-delay: -0.1s;
    }
`;

const FullPageLoader = () => {
    return (
        <div
            aria-busy={'true'}
            css={css`
                ${tw`h-screen w-screen flex flex-row justify-center items-center bg-black`}
            `}>
            <LoaderContainer>
                <LoaderInner>
                    <div />
                    <div />
                    <div />
                    <div />
                </LoaderInner>
            </LoaderContainer>
        </div>
    );
};

export default FullPageLoader;
