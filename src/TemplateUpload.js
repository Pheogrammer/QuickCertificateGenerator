import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const TemplateUpload = ({ onTemplateUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
    onTemplateUpload(acceptedFiles[0]);
  };

  return (
    <div>
      <h2>Upload Certificate Template</h2>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {uploadedFile ? (
              <p>Template uploaded: {uploadedFile.name}</p>
            ) : (
              <p>Drag 'n' drop or click to select a file</p>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default TemplateUpload;
