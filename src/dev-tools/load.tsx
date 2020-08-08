export default async () => {
    if ((window as any).Cypress || process.env.NODE_ENV !== 'development') {
        return;
    }
    await import('./dev-tools').then((d) => d.default());
};
