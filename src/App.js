import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import TextEditor from './TextEditor';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (file) => {
    setUploadedImage(URL.createObjectURL(file));
  };

  return (
    <div className="App">
      <h1>Certificate Generator App</h1>
      {uploadedImage ? (
        <TextEditor backgroundImage={uploadedImage} />
      ) : (
        <ImageUpload onImageUpload={handleImageUpload} />
      )}
    </div>
  );
}

export default App;
