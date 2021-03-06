import React, { useCallback, useRef, useState, useEffect } from 'react';

import tw, { styled, css } from 'twin.macro';
import * as yup from 'yup';

import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ValidationState } from '@react-types/shared';
import { CgClose, CgSearch } from 'react-icons/cg';
import { InputStyle } from './common-styles';
import { useJourneyState } from '../context/JourneyStateContext';

const queryTerm = yup.string().trim().lowercase().min(3, 'tooShort');

const iconStyle = css`
    ${tw`text-black bg-orange-100 h-10 self-center hover:text-red`};
    svg {
        ${tw`stroke-1`}
    }
`;

const SearchContainer = styled.div`
    ${tw`col-start-3
    col-end-5
    self-center
    flex
    items-center`};
    span {
        ${tw`pl-2 inline-block rounded-l flex items-center`}
        ${({ disabled = false }: { disabled: boolean }) => (disabled ? tw`bg-opacity-50` : tw`bg-opacity-100`)}
    }
    button {
        ${tw`pr-2 rounded-r`}
        ${({ disabled = false }: { disabled: boolean }) => (disabled ? tw`bg-opacity-50` : tw`bg-opacity-100`)}
    }
    input:disabled {
        ${tw`bg-opacity-50 cursor-not-allowed hover:text-black`}
    }
`;

const SearchBarStyle = styled(InputStyle)`
    ${tw`w-full self-center rounded-none h-10 border-none bg-orange-100 placeholder-black`}
`;

const SearchBar: React.FC<{ onSubmit: (query: string) => void; disabled?: boolean }> = (props) => {
    const { onSubmit, disabled = false } = props;
    const { searchTerm } = useJourneyState();

    const [queryValid, setQueryValid] = useState<ValidationState>('valid');
    const { t } = useTranslation();
    const onSearch = useCallback(
        (query: string) =>
            queryTerm
                .validate(queryTerm.cast(query), { strict: true })
                .then((val) => {
                    setQueryValid('valid');
                    onSubmit(val);
                })
                .catch(() => {
                    setQueryValid('invalid');
                }),
        [queryValid, onSubmit]
    );
    const commonProps = {
        label: t('searchImage'),
        placeholder: t('searchImage'),
        isDisabled: disabled,
        isRequired: true,
        validationState: queryValid,
        onSubmit: onSearch,
    };

    const searchRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    const searchState = useSearchFieldState(commonProps);
    const { clearButtonProps, inputProps } = useSearchField({ ...commonProps, 'aria-autocomplete': 'none', 'aria-label': commonProps.label }, searchState, searchRef);

    useEffect(() => {
        if (searchTerm !== null) {
            return;
        }
        searchState.setValue('');
    }, [searchState.setValue, searchTerm]);

    return (
        <SearchContainer disabled={disabled}>
            <span css={iconStyle}>
                <CgSearch />
            </span>
            <SearchBarStyle {...inputProps} ref={searchRef} />
            <button {...clearButtonProps} type="button" css={iconStyle}>
                <CgClose />
            </button>
        </SearchContainer>
    );
};

export default SearchBar;
