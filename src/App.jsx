import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import CaptionForm from './components/CaptionForm';
import CaptionList from './components/CaptionList';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);

  const addCaption = (caption) => {
    setCaptions([...captions, caption]);
  };

  const removeCaption = (index) => {
    setCaptions(captions.filter((_, i) => i !== index));
  };

  const moveCaption = (index, direction) => {
    const newCaptions = [...captions];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newCaptions.length) {
      [newCaptions[index], newCaptions[targetIndex]] = [newCaptions[targetIndex], newCaptions[index]];
      setCaptions(newCaptions);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-900 text-gray-200">
      <h1 className="text-4xl font-bold text-center mb-8">Video Captioning Tool</h1>
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-200"
        />
        <CaptionForm addCaption={addCaption} />
        <CaptionList captions={captions} removeCaption={removeCaption} moveCaption={moveCaption} />
        {videoUrl && <VideoPlayer videoUrl={videoUrl} captions={captions} />}
      </div>
    </div>
  );
};

export default App;
