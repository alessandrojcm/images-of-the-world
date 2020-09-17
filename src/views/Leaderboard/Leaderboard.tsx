import React, { useEffect, useMemo, useState } from 'react';
import { Column, usePagination, useTable } from 'react-table';
import { usePaginatedQuery } from 'react-query';

import { useTranslation } from 'react-i18next';
import { FinishedJourney, IJourneyPagination } from '~types/models';
import { getJourneys } from '../../core/apis/iotwApi';
import Container from '../../components/Container';

type FetchInfo = { size: number; after?: number };

const LeaderBoard: React.FC = () => {
    const { t } = useTranslation();

    const [fetchInfo, setFetchInfo] = useState<FetchInfo>({
        size: 10,
    });

    const { resolvedData, canFetchMore, isFetching, isLoading, fetchMore } = usePaginatedQuery<IJourneyPagination>(['leaderboard', fetchInfo], (_: string, { size, after }: FetchInfo) => {
        return getJourneys(size, after).toPromise();
    });

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
        ],
        [resolvedData]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canNextPage,
        canPreviousPage,
        previousPage,
        nextPage,
        state: { pageIndex, pageSize },
    } = useTable<FinishedJourney>(
        {
            columns: tableData,
            data: resolvedData?.journeys ?? [],
            initialState: {
                pageIndex: 0,
            },
            pageCount: 10,
            manualPagination: true,
        },
        usePagination
    );

    useEffect(() => {
        setFetchInfo({
            size: pageSize,
            after: pageIndex,
        });
    }, [pageIndex, pageSize, setFetchInfo]);

    return (
        <Container>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Container>
    );
};

export default LeaderBoard;
