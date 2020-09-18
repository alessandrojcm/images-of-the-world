import React, { useCallback, useMemo, useState } from 'react';
import { Column, usePagination, useTable } from 'react-table';
import { usePaginatedQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { FinishedJourney, IJourneyPagination } from '~types/models';
import { getJourneys } from '../../core/apis/iotwApi';
import { ArrowLeft, ArrowRight, Details, Table, TableBody, TableButton, TableFooter, TableHeader } from './StyledComponents';
import { Title } from '../../components/Typography';
import { IconButton } from '../../components/Button';
import Container from '../../components/Container';

type FetchInfo = { size: number; after?: string; before?: string };

const LeaderBoard: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { push } = useHistory();

    const [fetchInfo, setFetchInfo] = useState<FetchInfo>({
        size: 10,
    });

    const { resolvedData, isFetching, isLoading } = usePaginatedQuery<IJourneyPagination>(
        ['leaderboard', fetchInfo],
        (_: string, { size, after, before }: FetchInfo) => {
            return getJourneys(size, after, before).toPromise();
        },
        {
            forceFetchOnMount: true,
        }
    );

    const tableData = useMemo<Column<FinishedJourney>[]>(
        () => [
            {
                Header: t('winner') as string,
                accessor: ({ winner }) => winner?.sellerName,
            },
            {
                Header: t('winnerPoints') as string,
                accessor: ({ winner }) => winner?.points,
            },
            {
                Header: t('user') as string,
                accessor: ({ user: { name, lastName } }) => `${name} ${lastName}`,
            },
            {
                Header: t('seeMore') as string,
                accessor: ({ id }) => id as string,
                id: 'journeyId',
            },
        ],
        [resolvedData, i18n.language]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageSize },
    } = useTable<FinishedJourney>(
        {
            columns: tableData,
            data: resolvedData?.journeys ?? [],
            initialState: {
                pageIndex: 0,
            },
            getRowId: (row) => row.id as string,
            pageCount: resolvedData?.items ? Math.ceil(resolvedData?.items / fetchInfo.size) : 0,
            manualPagination: true,
        },
        usePagination
    );

    const canNextPage = useMemo(() => {
        return Boolean(resolvedData?.after);
    }, [resolvedData?.after]);
    const canPreviousPage = useMemo(() => {
        return Boolean(resolvedData?.before);
    }, [resolvedData?.before]);

    const nextPage = useCallback(() => {
        setFetchInfo({
            size: pageSize,
            after: resolvedData?.after,
        });
    }, [setFetchInfo, resolvedData?.after, pageSize]);
    const previousPage = useCallback(() => {
        setFetchInfo({
            size: pageSize,
            before: resolvedData?.before,
        });
    }, [setFetchInfo, resolvedData?.before, pageSize]);

    return (
        <Container>
            <Title>{t('leaderboard')}</Title>
            <Table {...getTableProps()}>
                <TableHeader>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </TableHeader>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    if (cell.column.id === 'journeyId') {
                                        return (
                                            <IconButton
                                                onClick={() => {
                                                    push(`/leaderboard/${cell.row.id}`);
                                                }}>
                                                <Details />
                                            </IconButton>
                                        );
                                    }
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableButton onClick={previousPage} disabled={!(canPreviousPage || isLoading || isFetching)}>
                        <ArrowLeft disabled={!(canPreviousPage || isLoading || isFetching)} />
                    </TableButton>
                    <TableButton onClick={nextPage} disabled={!(canNextPage || isLoading || isFetching)}>
                        <ArrowRight disabled={!(canNextPage || isLoading || isFetching)} />
                    </TableButton>
                </TableFooter>
            </Table>
        </Container>
    );
};

export default LeaderBoard;
