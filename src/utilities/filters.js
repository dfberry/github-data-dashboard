import React from 'react'

// Date
export function shortDate(date) {
    if (date && date.length > 10) {
        return date.slice(0, 10)
    } else {
        return date
    }
}

// text search input
export function TextSearchFilter({
    column: { filterValue, preFilteredRows, setFilter }
}) {
    return (
        <input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search...`}
        />
    )
}

// a dropdown list filter
export function DropdownFilter({
    column: { filterValue, setFilter, preFilteredRows, id }
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row) => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}
