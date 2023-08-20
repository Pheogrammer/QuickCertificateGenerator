import React, { useState } from 'react';
import TemplateUpload from './TemplateUpload';

const App = () => {
  const [templateFile, setTemplateFile] = useState(null);

  const handleTemplateUpload = (file) => {
    setTemplateFile(file);
  };

  return (
    <div>
      <h1>Certificate Generation App</h1>
      <TemplateUpload onTemplateUpload={handleTemplateUpload} />
      {/* More components and steps will go here */}
    </div>
  );
};

export default App;
