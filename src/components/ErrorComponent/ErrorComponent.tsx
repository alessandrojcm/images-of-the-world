import React from 'react';
import { FallbackProps } from 'react-error-boundary';

import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { PrimaryButton as Button } from '../Button';

const Container = tw.div`
    row-start-3
    col-start-3
    col-end-5
    flex
    flex-col
    items-center
    justify-center
`;

const ErrorTitle = tw.h1`
   text-4xl
   text-shadow
   font-display
   text-primary
`;

const ErrorComponent: React.FC<FallbackProps> = (props) => {
    const { resetErrorBoundary } = props;
    const { t } = useTranslation();
    return (
        <Container>
            <ErrorTitle>{t('error')}</ErrorTitle>
            <Button onClick={resetErrorBoundary}>{t('tryAgain')}</Button>
        </Container>
    );
};

export default ErrorComponent;
