import React, { useState, useRef } from 'react';

const TextEditor = ({ backgroundImage }) => {
  const [textElements, setTextElements] = useState([]);
  const [newText, setNewText] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);

  const canvasRef = useRef(null);

  const handleAddText = () => {
    if (selectedTextIndex !== null) {
      const updatedTextElements = [...textElements];
      updatedTextElements[selectedTextIndex] = {
        content: newText,
        fontFamily,
        fontSize,
        isBold,
        isItalic,
        top: textElements[selectedTextIndex].top,
        left: textElements[selectedTextIndex].left,
      };
      setTextElements(updatedTextElements);
      setSelectedTextIndex(null);
      setNewText('');
    } else {
      setTextElements([
        ...textElements,
        {
          content: newText,
          fontFamily,
          fontSize,
          isBold,
          isItalic,
          top: 100,
          left: 100,
        },
      ]);
      setNewText('');
    }
  };

  const handleDeleteText = () => {
    if (selectedTextIndex !== null) {
      const updatedTextElements = textElements.filter(
        (_, index) => index !== selectedTextIndex
      );
      setTextElements(updatedTextElements);
      setSelectedTextIndex(null);
      setNewText('');
    }
  };

  const handleTextPositionChange = (e, index) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const updatedTextElements = [...textElements];
    updatedTextElements[index].top = e.clientY - rect.top;
    updatedTextElements[index].left = e.clientX - rect.left;

    setTextElements(updatedTextElements);
  };

  const handleTextClick = (index) => {
    const selectedText = textElements[index];
    setNewText(selectedText.content);
    setFontFamily(selectedText.fontFamily);
    setFontSize(selectedText.fontSize);
    setIsBold(selectedText.isBold);
    setIsItalic(selectedText.isItalic);
    setSelectedTextIndex(index);
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = backgroundImage;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);

      textElements.forEach((text) => {
        context.font = `${text.isBold ? 'bold' : ''} ${
          text.isItalic ? 'italic' : ''
        } ${text.fontSize} ${text.fontFamily}`;
        context.fillStyle = 'black';
        context.fillText(text.content, text.left, text.top);
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'edited_image.png';
      link.click();
    };
  };

  return (
    <div className="text-editor-container">
      <div className="image-container">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Uploaded Template"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
        {textElements.map((text, index) => (
          <div
            key={index}
            className={`text-element ${
              index === selectedTextIndex ? 'selected' : ''
            }`}
            style={{
              fontFamily: text.fontFamily,
              fontSize: text.fontSize,
              fontWeight: text.isBold ? 'bold' : 'normal',
              fontStyle: text.isItalic ? 'italic' : 'normal',
              top: `${text.top}px`,
              left: `${text.left}px`,
              position: 'absolute',
              cursor: 'pointer',
            }}
            onClick={() => handleTextClick(index)}
            draggable
            onDragEnd={(e) => handleTextPositionChange(e, index)}
          >
            {text.content}
          </div>
        ))}
      </div>
      <div className="text-options">
        <label>Text:</label>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <label>Font Size:</label>
        <input
          type="text"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <label>Font Family:</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <label>Bold:</label>
        <input
          type="checkbox"
          checked={isBold}
          onChange={(e) => setIsBold(e.target.checked)}
        />
        <label>Italic:</label>
        <input
          type="checkbox"
          checked={isItalic}
          onChange={(e) => setIsItalic(e.target.checked)}
        />
        <button onClick={handleAddText}>Add Text</button>
        <button onClick={handleDeleteText} disabled={selectedTextIndex === null}>
          Delete Text
        </button>
        <button onClick={handleDownloadImage}>Download Image</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default TextEditor;
