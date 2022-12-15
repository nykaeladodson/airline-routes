import React, { useState } from 'react'

const Table = ({ columns, rows, format, perPage }) => {
  const [page, setPage] = useState(1)

  const headers = columns.map(column => {
    return (
      <th>{column.name}</th>
    )
  })

  const rowsOnPage = rows.slice((page - 1) * perPage, page * perPage)
  const body = rowsOnPage.map(row => {
    const currentRows = columns.map(col => {
      const value = row[col.property]
      return <td>{format(col.property, value)}</td>
    })

    return <tr>{currentRows}</tr>
  })

  const handlePrevPage = () => {
    const prevPage = page - 1
    setPage(prevPage)
  }

  const handleNextPage = () => {
    const nextPage = page + 1
    setPage(nextPage)
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
      <div>
        <p>Showing {(page - 1) * perPage + 1} - {page * perPage} of {rows.length} total routes.</p>
        <button disabled={page === 1} onClick={handlePrevPage}>Previous Page</button>
        <button disabled={(page + 1) * perPage > rows.length} onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  )
}

export default Table
