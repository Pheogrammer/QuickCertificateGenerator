import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './TemplateUpload.css'; 

const TemplateUpload = ({ onTemplateUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const allowedFileTypes = ['image/jpeg', 'image/png'];

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (allowedFileTypes.includes(file.type)) {
      setUploadedFile(file);
      onTemplateUpload(file);
    } else {
      alert('Please upload a valid image (JPEG or PNG) file.');
    }
  };

  return (
    <div className="template-upload">
      <h2>Upload Certificate Template</h2>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <div className="custom-card">
              {uploadedFile ? (
                <div>
                  <p>Template uploaded: {uploadedFile.name}</p>
                  {allowedFileTypes.includes(uploadedFile.type) && (
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Template Preview"
                      className="preview-image"
                    />
                  )}
                </div>
              ) : (
                <p>Drag 'n' drop or click to select an image (JPEG or PNG) file</p>
              )}
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default TemplateUpload;
