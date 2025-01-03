import React from 'react';

function Card({ heading, paragraph, radioValue, className = '' , onRadioChange  }) {
  return (
    <div 
    className={`border border-gray-300 rounded-lg p-2 w-full max-w-xs h-20 mx-auto shadow-sm flex justify-between items-center cursor-pointer 
      ${radioValue ? 'bg-[#CBEA7B80]' : 'bg-gray-200'} ${className} sm:max-w-sm md:max-w-md lg:max-w-lg`}
  >
    <div className="flex-1">
      <h1 className="text-sm sm:text-base md:text-lg font-semibold">{heading}</h1>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base">{paragraph}</p>
    </div>
    <label>
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
