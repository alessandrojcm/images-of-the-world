import tw, { styled } from 'twin.macro';

// eslint-disable-next-line
export const InputStyle = styled.input`
    ${tw`
        w-full
        bg-opacity-75
        bg-gold
        text-black
        rounded
        placeholder-black
        placeholder-opacity-50
        p-1
        border-2
        border-transparent
        disabled:bg-opacity-50
        disabled:cursor-not-allowed
        disabled:border-none
        hover:border-green
        focus:border-green
        active:border-green
    `};
    :invalid,
    input[aria-invalid='true'] {
        ${tw`border-2 border-primary`}
    }
`;
