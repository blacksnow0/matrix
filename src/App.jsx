import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [matrix, setMatrix] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(false))
  );

  const [sequence, setSequence] = useState([]);
  const [highlights, setHighlights] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(false))
  );

  const handleClick = (rowIndex, colIndex) => {
    if (matrix[rowIndex][colIndex]) return;

    const newMatrix = matrix.map((row, r) =>
      row.map((val, c) => (r === rowIndex && c === colIndex ? true : val))
    );
    setMatrix(newMatrix);
    setSequence((prev) => [...prev, [rowIndex, colIndex]]);
  };

  useEffect(() => {
    if (sequence.length !== 9) return;
    const playSequenceAnimation = () => {
      setHighlights(
        Array(3)
          .fill(null)
          .map(() => Array(3).fill(false))
      );
      sequence.forEach(([r, c], i) => {
        setTimeout(() => {
          setHighlights((prev) =>
            prev.map((row, rowIndex) =>
              row.map((val, colIndex) =>
                rowIndex === r && colIndex === c ? true : val
              )
            )
          );
        }, i * 500);
      });
    };
    playSequenceAnimation();
  }, [sequence]);

  return (
    <div>
      <nav>
        <h1 className="font-mono text-xl mb-4">Matrix</h1>
      </nav>
      <main className="flex h-[90vh] justify-center items-center">
        <div className="grid grid-cols-3 gap-2 ">
          {matrix.map((row, rowIndex) =>
            row.map((clicked, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={`w-20 h-20 rounded text-xl transition-all duration-300 ${
                  highlights[rowIndex][colIndex]
                    ? "bg-orange-300"
                    : clicked
                    ? "bg-green-300"
                    : "bg-sky-300 hover:bg-sky-400"
                }`}
              ></button>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
