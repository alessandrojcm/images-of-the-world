import React, { useCallback, useEffect } from 'react';
import tw, { css } from 'twin.macro';

import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, ButtonsContainer, Container, Subtitle } from './StyledComponents';
import { useCurrentUser, useCurrentUserDispatchers } from '../../context';
import { startFormSchema, StartFormSchema } from '../../types/form-schemas/startForm';
import { Control, Form, Input } from '../../components/Form';
import { Title } from '../../components/Typography';

const Registration = () => {
    const { t } = useTranslation();
    const { userLoggedIn } = useCurrentUser();
    const { setUser } = useCurrentUserDispatchers();
    const { push } = useHistory();

    const {
        errors,
        handleSubmit,
        register,
        formState: { isSubmitting, isValid },
    } = useForm<StartFormSchema>({
        resolver: yupResolver(startFormSchema),
        mode: 'onChange',
    });

    const onSubmit = useCallback(
        (data: StartFormSchema) => {
            setUser(data);
        },
        [setUser]
    );

    useEffect(() => {
        if (!userLoggedIn) {
            return;
        }
        push('/journey/start');
    }, [userLoggedIn]);

    return (
        <Container>
            <Title>{t('startMessage')}</Title>
            <Subtitle>{t('startMessageSub')}</Subtitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <fieldset
                    disabled={isSubmitting}
                    css={css`
                        ${tw`w-3/4`}
                    `}>
                    <Control>
                        <Input ref={register} inputName="name" placeholder="John" label={t('name')} error={errors.name} required />
                    </Control>
                    <Control>
                        <Input ref={register} inputName="lastName" placeholder="Doe" label={t('lastName')} error={errors.lastName} required />
                    </Control>
                    <Control>
                        <Input type="email" ref={register} inputName="email" placeholder="john@doe.com" label={t('email')} error={errors.email} required />
                    </Control>
                    <ButtonsContainer>
                        <Button disabled={isSubmitting || !isValid} type="submit">
                            {t('start')}
                        </Button>
                    </ButtonsContainer>
                </fieldset>
            </Form>
        </Container>
    );
};

export default Registration;
