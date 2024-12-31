import React, { useState, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import filter from '../../assets/icons/filter.png';

const TableSection = ({ tableData = [], handleRowClick, handleEditClick, handleCardClick, loading }) => {
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
  const sortedData = useMemo(() => {
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
          {loading ? (
            [...Array(rowsPerPage)].map((_, index) => (
              <tr key={index}>
                {[...Array(7)].map((_, i) => (
                  <td key={i} className="border border-gray-300 px-4 py-2">
                    <Skeleton height={20} />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            currentData.map((row, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(row)}
              >
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.species || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">
                  {typeof row.modalityType === 'object' ? row.modalityType.name || 'N/A' : row.modalityType}
                </td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.studyType || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.userId || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.macros || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.template || 'N/A'}</td>
                <td 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(row);
                  handleCardClick(0);
                  handleCardClick(1);
                  handleCardClick(2);
                  handleCardClick(3);
                }} 
                 className="border border-gray-300 px-4 py-2 font-dmSans">
                  <button
                    
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
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