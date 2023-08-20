import React, { useState } from 'react';

const TextEditor = ({ backgroundImage }) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const [top, setTop] = useState(50); 
  const [left, setLeft] = useState(50); 

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleFontWeightChange = (e) => {
    setFontWeight(e.target.checked ? 'bold' : 'normal');
  };

  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.checked ? 'italic' : 'normal');
  };

  const handleTextPositionChange = (e) => {
    setTop(e.clientY);
    setLeft(e.clientX);
  };

  return (
    <div className="text-editor-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div
          className="text-box"
          style={{
            fontSize,
            fontFamily,
            fontWeight,
            fontStyle,
            top: `${top}px`,
            left: `${left}px`,
          }}
          draggable="true"
          onDrag={(e) => handleTextPositionChange(e)}
        >
          {text}
        </div>
      </div>
      <div className="text-options">
        <label>Text:</label>
        <input type="text" value={text} onChange={handleTextChange} />
        <label>Font Size:</label>
        <input type="text" value={fontSize} onChange={handleFontSizeChange} />
        <label>Font Family:</label>
        <select value={fontFamily} onChange={handleFontFamilyChange}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          {/* Add more font options */}
        </select>
        <label>Bold:</label>
        <input type="checkbox" checked={fontWeight === 'bold'} onChange={handleFontWeightChange} />
        <label>Italic:</label>
        <input type="checkbox" checked={fontStyle === 'italic'} onChange={handleFontStyleChange} />
      </div>
    </div>
  );
};

export default TextEditor;
