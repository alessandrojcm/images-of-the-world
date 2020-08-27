import tw, { styled } from 'twin.macro';

const Container = tw.div`
    container
    flex
    flex-no-wrap
    flex-col
    items-center
    justify-center
    h-auto
    w-1/2
    p-5
`;

export const ColumnContainer = styled(Container)`
    ${tw`w-auto items-start rounded-lg`};
`;

export default Container;
