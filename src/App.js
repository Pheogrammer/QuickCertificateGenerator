import React, { useState } from 'react';
import TemplateUpload from './TemplateUpload';

const App = () => {
  const [templateFile, setTemplateFile] = useState(null);

  const handleTemplateUpload = (file) => {
    setTemplateFile(file);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Certificate Generation App</h1>
      <div className="row">
        <div className="col-md-6">
          <TemplateUpload onTemplateUpload={handleTemplateUpload} />
        </div>
        <div className="col-md-6">
          {/* Preview or other components */}
        </div>
      </div>
    </div>
  );
};

export default App;
