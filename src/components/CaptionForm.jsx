import React, { useState } from 'react';

const CaptionForm = ({ addCaption }) => {
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && startTime && endTime) {
      addCaption({ text, startTime: parseFloat(startTime), endTime: parseFloat(endTime) });
      setText('');
      setStartTime('');
      setEndTime('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col mb-2">
        <label className="mb-1 font-medium">Caption Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 border border-gray-700 rounded bg-gray-900 text-gray-200"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label className="mb-1 font-medium">Start Time (seconds)</label>
        <input
          type="number"
          step="0.1"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="p-2 border border-gray-700 rounded bg-gray-900 text-gray-200"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-medium">End Time (seconds)</label>
        <input
          type="number"
          step="0.1"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-2 border border-gray-700 rounded bg-gray-900 text-gray-200"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300">
        Add Caption
      </button>
    </form>
  );
};

export default CaptionForm;
