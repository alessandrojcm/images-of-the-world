import tw from 'twin.macro';

const Container = tw.div`
    flex
    justify-around
    items-center
    w-full
    h-full
`;

const Aside = tw.aside`
    flex
    flex-col
    justify-evenly
    items-center
    h-full
`;

export { Container, Aside };
