import React, { useEffect, useRef, useState } from 'react';
import { AppearanceTypes, Placement, ToastProps } from 'react-toast-notifications';
import { AiOutlineClose } from 'react-icons/ai';
import tw, { styled } from 'twin.macro';

import Button from '../Button';

const NoBorderButton = styled(Button)`
    ${tw`border-none`}
`;

// Most of this code is copied from the source of
// react-toast-notification. Had to copy it
// to customize it further

const gutter = 8;

function getTranslate(placement: Placement) {
    const pos = placement.split('-');
    const relevantPlacement = pos[1] === 'center' ? pos[0] : pos[1];
    const translateMap: Record<string, string> = {
        right: 'translate3d(120%, 0, 0)',
        left: 'translate3d(-120%, 0, 0)',
        bottom: 'translate3d(0, 120%, 0)',
        top: 'translate3d(0, -120%, 0)',
    };

    return translateMap[relevantPlacement];
}

const toastStates = (placement: Placement) => ({
    entering: { transform: getTranslate(placement) },
    entered: { transform: 'translate3d(0,0,0)' },
    exiting: { transform: 'scale(0.66)', opacity: 0 },
    exited: { transform: 'scale(0.66)', opacity: 0 },
});

const CustomToast = styled.div`
    ${tw`
    w-auto
    h-auto
    flex
    items-center
    font-body
    rounded-sm
    p-4
    shadow
    justify-between`};
    ${({ appearance }: { appearance: AppearanceTypes }) => {
        switch (appearance) {
            case 'error':
                return tw`bg-primary text-orange-100`;
            case 'success':
                return tw`bg-green text-orange-100`;
            case 'warning':
                return tw`bg-black text-orange-100`;
            default:
                return tw`bg-orange-200 text-black`;
        }
    }}
`;

const Toast: React.FC<ToastProps> = (props) => {
    const { transitionState, transitionDuration, appearance, children, placement, onDismiss } = props;
    const [height, setHeight] = useState<string | number>('auto');
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (transitionState === 'entered') {
            const el = elementRef.current;
            if (!el) {
                return;
            }
            setHeight(el.offsetHeight + gutter);
        }
        if (transitionState === 'exiting') {
            setHeight(0);
        }
    }, [transitionState]);

    return (
        <div
            ref={elementRef}
            style={{ height }}
            css={{
                transition: `height ${transitionDuration - 100}ms 100ms`,
            }}>
            <CustomToast
                className={`react-toast-notifications__toast react-toast-notifications__toast--${appearance}`}
                css={{
                    marginBottom: gutter,
                    transition: `transform ${transitionDuration}ms cubic-bezier(0.2, 0, 0, 1), opacity ${transitionDuration}ms`,
                    ...toastStates(placement)[transitionState],
                }}
                {...props}>
                {children}
                <NoBorderButton onClick={onDismiss}>
                    <AiOutlineClose />
                </NoBorderButton>
            </CustomToast>
        </div>
    );
};

export default Toast;
