import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import "./App.css";
import { useTable } from "react-table";
import { RequestOptions } from "https";

const url = process.env.REACT_APP_FN_URL;
const code = process.env.REACT_APP_FN_CODE;

async function getData() {


  const response = await fetch(`${url}${code}`);
  const data = await response.json();
  return data;
}

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
`;

function Table({ columns, data }: any) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App(): JSX.Element {

  const [data, setData] = useState([]);

  var requestOptions:RequestInit = {
    method: 'GET',
    redirect: 'follow'
  };

  useEffect(() => {
    fetch(`${url}${code}`,requestOptions)
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => {
      console.log(data)
      setData(data)
  })
    .catch(err=>console.log(err.message))
  },[])

  const columns = [
    {
      Header: "Name",
      columns: [
        {
          Header: "RepositoryName",
          accessor: "repositoryName",
        },
        {
          Header: "Url",
          accessor: "url",
        },
      ],
    },
  ];

  return (
    <div className="App">
      <Styles>
          <Table columns={columns} data={data} />
      </Styles>
    </div>
  );
}

export default App;
