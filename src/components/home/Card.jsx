import React from 'react';

function Card({ heading, paragraph, radioValue, className = '' , onRadioChange  }) {
  return (
    <div className={`border border-gray-300 rounded-lg p-2 w-80 h-20 mx-auto shadow-sm flex justify-between ${
      radioValue ? 'bg-[#CBEA7B80]' : 'bg-gray-200'
    } ${className}`}>
        <div>
      <h1 className="text-lg font-semibold ">{heading}</h1>
      <h1 className="text-gray-600 mb-2 text-xs">{paragraph}</h1>
        </div>
      <label className=" ">
        <input 
          type="checkbox" 
          checked={radioValue} 
          name="cardOption"
          onChange={onRadioChange} 
          className="appearance-none h-4 w-4 border-2 border-gray-600 rounded-full checked:bg-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2"
        />
      </label>
    </div>
  );
}
 
export default Card;
