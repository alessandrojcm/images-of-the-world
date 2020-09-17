import { UsePaginationInstanceProps, UsePaginationOptions, UsePaginationState } from 'react-table';

declare module 'react-table' {
    // @ts-ignore
    export interface TableOptions<D extends Record<string, unknown>> extends UsePaginationOptions<D> {}

    // @ts-ignore
    export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>> extends UsePaginationInstanceProps<D> {}

    // @ts-ignore
    export interface TableState<D extends Record<string, unknown> = Record<string, unknown>> extends UsePaginationState<D> {}
}
