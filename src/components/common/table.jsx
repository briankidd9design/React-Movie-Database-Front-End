import React from 'react';
import TableHeader from './tableHeader';
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
    // const { columns, sortColumn, onSort, data } = props;
    return (
    <table className="table">
    <TableHeader
        columns={columns}
        sortColumn={sortColumn} 
        onSort={onSort}
      />
      {/* data is completely decoupled from movies */}
    <TableBody columns={columns} data={data} />
    {/* <tbody>
      {movies.map((movie) => (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
          
          </td>
          <td>
    {" "}
          </td>
        </tr>
      ))}
    </tbody> */}
  </table>
    );
    
}
 
export default Table;