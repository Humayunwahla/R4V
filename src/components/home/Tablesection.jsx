import React from 'react';
import filter from '../../assets/icons/filter.png';

const TableSection = ({ tableData, handleRowClick, handleEditClick, handleCardClick }) => {
  return (
    <div className="mt-8 overflow-scroll">
      <table className="table-auto border bg-white min-w-full text-left">
        <thead className="text-sm">
          <tr>
            {['Species', 'Modality Type', 'Study Type', 'User ID’s', 'Macros', 'Templates', 'Edits'].map((header, index) => (
              <th key={index} className="border px-2 py-2 min-w-[150px]">
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
          {tableData.map((row, index) => (
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
    </div>
  );
};

export default TableSection;