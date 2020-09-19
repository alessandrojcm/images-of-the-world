module.exports = {
    useToasts: jest.fn().mockReturnValue({
        addToast: jest.fn(),
    }),
};
