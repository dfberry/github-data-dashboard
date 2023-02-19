// @ts-nocheck
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTable, useSortBy, useFilters } from 'react-table'
import styled from 'styled-components'
import { shortDate } from '../utilities/filters'
import { isOneYearOldPlus } from '../utilities/compare'
import {ReactComponent as OffSiteLink} from '../images/off-site.svg';
// filters
import { TextSearchFilter } from '../utilities/filters'

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`
function Table({ columns, data }: any) {
    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: ''
        }),
        []
    )

    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
                defaultColumn
            },
            useFilters,
            useSortBy
        )

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                            >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </span>
                                <div></div>
                                <div>
                                    {column.canFilter
                                        ? column.render('Filter')
                                        : null}{' '}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.column.id === 'rowNumber'
                                            ? i + 1
                                            : cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

function DataTableOrg({ data, collectionDate }: any): JSX.Element {
    const columns = [
        {
            Header: `Azure-samples - ${data.length} repos`,
            columns: [
                {
                    Header: '#',
                    id: 'rowNumber'
                },
                {
                    Header: 'Watchers',
                    accessor: 'watchers'
                },
                {
                    Header: 'Stars',
                    accessor: 'stars'
                },
                {
                    Header: 'Forks',
                    accessor: 'forks'
                },
                {
                    Header: 'Repo',
                    accessor: 'repositoryName',
                    Filter: TextSearchFilter,
                    Cell: (row: any) => {
                        const repoName = row.cell.value
                        if (!repoName) return ''
                        const url = `/repo?name=${repoName}&owner=azure-samples`
                        const githubUrl =`https://github.com/azure-samples/${repoName}`

                        return <><Link to={url}>{repoName}</Link>&nbsp;<a href={githubUrl} target="_blank" rel="noreferrer"><OffSiteLink/></a></>
                    }
                },
                {
                    Header: 'License',
                    accessor: 'legal.license',
                    Cell: (row: any) => {
                        const license = row.cell.value
                        if (!license) {
                            return <div className="ErrorBox">None</div>
                        } else {
                            return license
                        }
                    }
                },
                {
                    Header: 'Disk usage',
                    accessor: 'diskUsage'
                },
                {
                    Header: 'Issues',
                    accessor: 'issues'
                },
                {
                    Header: 'PRs',
                    accessor: 'pr'
                },
                {
                    Header: 'Template',
                    accessor: (d) => {
                        return d?.is?.isTemplate.toString()
                    }
                },
                // TBD - doesn't work with personal GitHub account
                // {
                //   Header: "Private",
                //   accessor: d => { return d?.is?.isPrivate.toString()}
                // },

                {
                    Header: 'Archived',
                    accessor: 'is',

                    //            return d?.is?.isArchived.toString();

                    Cell: (row: any) => {
                        const isArchived = row.cell.value?.isArchived || null
                        if (!isArchived) return ''

                        let archiveClass = ''
                        if (isArchived === true) {
                            archiveClass = 'DisregardBox'
                        }
                        return (
                            <div className={archiveClass}>
                                {isArchived.toString()}
                            </div>
                        )
                    }
                },
                // {
                //   Header: "Disabled",
                //   accessor: d => { return d?.is?.isDisabled.toString()}
                // },
                {
                    Header: 'Created',
                    accessor: 'date.createdAt',
                    Cell: (row: any) => {
                        const date = row.cell.value
                        if (!date) return ''
                        const newDate = `${shortDate(date)}`
                        return newDate
                    }
                },
                {
                    Header: 'Last push',
                    accessor: 'lastPushToDefaultBranch',
                    Cell: (row: any) => {
                        const date = row.cell.value
                        if (!date?.pushedDate) return ''
                        let lastPushClass = ''

                        if (isOneYearOldPlus(date?.pushedDate)) {
                            lastPushClass = 'WarningBox'
                        }
                        return (
                            <div className={lastPushClass}>
                                {shortDate(date?.pushedDate)}
                            </div>
                        )
                    }
                }
            ]
        }
    ]

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    )
}

export default DataTableOrg
