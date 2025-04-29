import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Impact');
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGenerateMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = `50px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';

      // Top text
      ctx.fillText(topText, canvas.width / 2, 60);
      ctx.strokeText(topText, canvas.width / 2, 60);

      // Bottom text
      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
      ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    };
  };

  const handleDownloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'venky-meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="app">
      <h1 className="title">Venky AI Meme Generator 🎉</h1>

      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />

        <div className="picker">
          <span>Pick Text Color:</span>
          <ChromePicker
            color={textColor}
            onChange={(updatedColor) => setTextColor(updatedColor.hex)}
          />
        </div>

        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="Impact">Impact</option>
          <option value="Arial">Arial</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>

        <div className="buttons">
          <button className="generate" onClick={handleGenerateMeme}>Generate Meme</button>
          <button className="download" onClick={handleDownloadMeme}>Download Meme</button>
        </div>
      </div>

      <div className="preview">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
