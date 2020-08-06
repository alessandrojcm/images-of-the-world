import React, { createContext, useCallback, useContext, useState } from 'react';
import { startFormSchema } from '../../types/form-schemas';
import { ICurrentUserContext, ICurrentUserContextUpdaters } from '../../types/props';

const UserContext = createContext<ICurrentUserContext>({
    name: '',
    lastName: '',
    email: '',
    userLoggedIn: false,
});

const DispatchUserContext = createContext<ICurrentUserContextUpdaters>({
    setUser: () => {},
    resetUser: () => {},
});

const CurrentUserContext: React.FC = (props) => {
    const { children } = props;
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const userContextValue: ICurrentUserContext = {
        name,
        lastName,
        email,
        userLoggedIn,
    };
    const userContextUpdater: ICurrentUserContextUpdaters = {
        setUser: useCallback(
            (user) => {
                setName(user.name);
                setLastName(user.lastName);
                setEmail(user.email);
                startFormSchema.isValid(user).then((res) => setUserLoggedIn(res));
            },
            [setName, setLastName, setEmail, setUserLoggedIn]
        ),
        resetUser: useCallback(() => {
            setName('');
            setLastName('');
            setEmail('');
            setUserLoggedIn(false);
        }, [setName, setLastName, setEmail, setUserLoggedIn]),
    };

    return (
        <UserContext.Provider value={userContextValue}>
            <DispatchUserContext.Provider value={userContextUpdater}>{children}</DispatchUserContext.Provider>
        </UserContext.Provider>
    );
};

const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useCurrentUser must be used within a UserContext');
    }

    return context;
};

const useCurrentUserDispatchers = () => {
    const context = React.useContext(DispatchUserContext);

    if (context === undefined) {
        throw new Error('useCurrentUserDispatchers must be used within a UserContext');
    }

    return context;
};

export default CurrentUserContext;
export { useCurrentUser, useCurrentUserDispatchers };
