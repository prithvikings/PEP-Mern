import React, { useState } from "react";

const Randomcolour = () => {
  const [color, setColor] = useState("#ffffff");

  const changeColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className="min-h-screen flex flex-col items-center justify-center gap-5"
    >
      <h1 className="text-3xl font-medium">Random Color Generator</h1>

      <button
        onClick={changeColor}
        className="font-medium cursor-pointer px-4 py-2 rounded bg-zinc-200 text-zinc-800 hover:bg-zinc-300 transition-colors duration-300"
      >
        See the Magic ✨
      </button>

      <p className="font-mono">{color}</p>
    </div>
  );
};

export default Randomcolour;
