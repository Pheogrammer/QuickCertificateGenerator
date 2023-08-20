import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onImageUpload(file);
  };

  return (
    <div>
      <h2>Upload Modified Certificate</h2>
      <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUpload;
