import tw, { styled } from 'twin.macro';

import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import Button from '../../components/Button';

const Table = tw.table`
    w-3/5
    h-auto
    bg-orange-200
    bg-opacity-75
    rounded
    p-5
`;

const TableHeader = tw.thead`
    w-screen
    bg-black
    font-body
    text-xl
    text-shadow
    text-center
    rounded-t
`;

const TableBody = tw.tbody`
    text-black
    text-shadow
    font-body
    text-lg
    text-center
`;

const TableRow = tw.tr`
    cursor-pointer
    hover:text-primary
`;

const TableButton = tw(Button)`border-none`;

const TableFooter = tw.tfoot`
    flex
    items-center
    justify-around
    py-4
`;

const ArrowLeft = styled(GoArrowLeft)`
    ${({ disabled = false }: { disabled?: boolean }) => {
        return disabled ? tw`text-black text-opacity-50` : tw`text-black`;
    }}
`;

const ArrowRight = styled(GoArrowRight)`
    ${({ disabled = false }: { disabled?: boolean }) => {
        return disabled ? tw`text-black text-opacity-50` : tw`text-black`;
    }}
`;

export { Table, TableHeader, TableBody, TableRow, TableButton, TableFooter, ArrowLeft, ArrowRight };
