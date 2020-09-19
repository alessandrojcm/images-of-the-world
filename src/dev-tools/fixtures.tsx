export type FillableFixture<T extends Record<string, any> = {}> = T & {
    action: {
        // Search via element or label
        element: 'label' | 'role' | 'text';
        name: string;
        type: 'click' | 'dblClick';
    };
};

const userFixture: FillableFixture<Record<string, any>> = {
    Name: 'John',
    'Last name': 'Doe',
    action: {
        element: 'text',
        name: 'Go ahead!',
        type: 'click',
    },
};

// eslint-disable-next-line
export const fixtures = { userFixture };
