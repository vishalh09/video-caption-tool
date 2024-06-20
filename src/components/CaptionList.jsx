import React from 'react';
import { FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const CaptionList = ({ captions, removeCaption, moveCaption }) => (
  <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-xl font-medium mb-4">Captions</h2>
    <ul>
      {captions.map((caption, index) => (
        <li key={index} className="mb-2 p-2 bg-gray-900 rounded flex justify-between items-center">
          <span className="mr-4">{caption.text} ({caption.startTime}s - {caption.endTime}s)</span>
          <div className="flex items-center">
            <button onClick={() => moveCaption(index, -1)} className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
              <FaArrowUp />
            </button>
            <button onClick={() => moveCaption(index, 1)} className="text-blue-500 hover:text-blue-600 transition-colors duration-300 mx-2">
              <FaArrowDown />
            </button>
            <button onClick={() => removeCaption(index)} className="text-red-500 hover:text-red-600 transition-colors duration-300">
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CaptionList;
