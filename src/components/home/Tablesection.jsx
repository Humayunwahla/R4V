import React, { useEffect, useState } from 'react';
import filter from '../../assets/icons/filter.png';
import { getTemplate } from '../../utils/API_SERVICE'
import { useAuth } from '../../Hooks/useAuth';

const TableSection = ({ tableData = [], handleRowClick, handleEditClick, handleCardClick }) => {
  // console.log("table data", tableData)
  const accessToken = useAuth()
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // State for sorting configuration
  const rowsPerPage = 5;



  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Sorting function
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return tableData;

    const sorted = [...tableData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [tableData, sortConfig]);

  const currentData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction: prevState.key === key && prevState.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="mt-8 overflow-scroll">
      <table className="table-auto border bg-white min-w-full text-left">
        <thead className="text-sm">
          <tr>
            {['Species', 'Modality Type', 'Study Type', 'User ID’s', 'Macros', 'Templates', 'Edits'].map((header, index) => (
              <th
                key={index}
                className="border px-2 py-2 min-w-[150px] cursor-pointer"
                onClick={() => handleSort(
                  header.toLowerCase().replace(' ', '').replace('’s', '') // Convert header to key format
                )}
              >
                <div className="flex gap-2 items-center">
                  <p>{header}</p>
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <img src={filter} alt="" className="w-3 h-3" />
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs">
          {currentData.map((row, index) => (
            <tr
              key={index}
              className="cursor-pointer hover:bg-gray-100"
              onClick={handleRowClick}
            >
              <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.species}</td>
              <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.modalityType}</td>
              <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.studyType}</td>
              <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.userId}</td>
              <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.macros}</td>
              <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.template}</td>
              <td className="border border-gray-300 px-4 py-2 font-dmSans">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(row);
                    handleCardClick(0);
                    handleCardClick(1);
                    handleCardClick(2);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableSection;
