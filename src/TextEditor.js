import React, { useState } from 'react';

const TextEditor = ({ backgroundImage }) => {
  const [textElements, setTextElements] = useState([]);
  const [newText, setNewText] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);

  const handleAddText = () => {
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
  };

  const handleDeleteText = () => {
    if (selectedTextIndex !== null) {
      const updatedTextElements = textElements.filter(
        (_, index) => index !== selectedTextIndex
      );
      setTextElements(updatedTextElements);
      setSelectedTextIndex(null);
    }
  };

  const handleTextPositionChange = (e, index) => {
    setTextElements((prevTextElements) => {
      const updatedTextElements = [...prevTextElements];
      updatedTextElements[index].top = e.clientY;
      updatedTextElements[index].left = e.clientX;
      return updatedTextElements;
    });
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
      </div>
    </div>
  );
};

export default TextEditor;
