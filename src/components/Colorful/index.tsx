import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const Colorful = () => {
  const [color, setColor] = useState('#aabbcc'); // Початковий колір

  return (
    <div>
      <h2>Виберіть колір:</h2>
      {/* Компонент HexColorPicker для вибору кольору */}
      <HexColorPicker color={color} onChange={setColor} />
      <h3 style={{ color: color }}>Вибраний колір: {color}</h3>
    </div>
  );
};

export default Colorful;