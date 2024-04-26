import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      const response = await AssessmentService.getList();
      if (Array.isArray(response)) {
        setAssessments(response);
      } else {
        console.error(`Error: Expected an array but received`, response);
        setAssessments([]);
      }
    };
    fetchAssessments();
  }, []);
  const deleteAssessment = async (id) => {
    const response = await fetch(`/api/assessment/${id}`, {
      method: `DELETE`,
    });
    if (response.ok) {
      setAssessments((currentAssessments) =>
        currentAssessments.filter((assessment) => String(assessment.id) !== String(id)));
    } else {
      console.error(`Failed to delete assessment`);
    }
  };
  const columns = React.useMemo(
    () => [
      {
        Header: `Assessment ID`,
        accessor: `id`, // accessor is the "key" in the data
      },
      {
        Header: `Assessed Cat`,
        accessor: `catName`,
      },
      {
        Header: `Date of Birth`,
        accessor: `catDateOfBirth`,
      },
      {
        Header: `Risk Level`,
        accessor: `riskLevel`,
      },
      {
        Header: `Score`,
        accessor: `score`,
      },
      {
        Cell: ({ value }) => new Date(value).toLocaleString(),
        Header: `Created At`,
        accessor: `createdAt`,
      },
      {
        Cell: ({ row: { original } }) =>
          <button className="btn btn-danger" onClick={() => deleteAssessment(original.id)}>
            Delete
          </button>,
        Header: `Edit/Delete`,
        id: `Actions`,
      },
    ],
    []
  );
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments });
  return (
    <div className="container">
      <div className="table-responsive">
        <table {...getTableProps()} className="table table-striped table-hover table-bordered">
          <thead>
            {headerGroups.map(headerGroup =>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column =>
                  <th {...column.getHeaderProps()}>{column.render(`Header`)}</th>)}
              </tr>)}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell =>
                    <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
