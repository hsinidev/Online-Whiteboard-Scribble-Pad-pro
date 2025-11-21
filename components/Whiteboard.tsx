import React from 'react';
import useWhiteboard from '../hooks/useWhiteboard';

const Whiteboard: React.FC = () => {
    const {
        canvasRef,
        color,
        setColor,
        lineWidth,
        setLineWidth,
        clearCanvas,
        undo,
        downloadImage,
        startDrawing,
        stopDrawing,
        draw,
    } = useWhiteboard();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
            <canvas
                ref={canvasRef}
                className="w-full h-full bg-white/5 rounded-lg shadow-2xl border border-cyan-500/20 cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseOut={stopDrawing}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/50 backdrop-blur-md border border-gray-700 p-3 rounded-full shadow-lg z-20 flex items-center gap-4 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                    <label htmlFor="colorPicker" className="text-sm font-medium text-gray-300">Color:</label>
                    <input
                        id="colorPicker"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-8 h-8 p-0 border-none bg-transparent rounded-full cursor-pointer appearance-none"
                        style={{'--color': color} as React.CSSProperties}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="brushSize" className="text-sm font-medium text-gray-300">Size: {lineWidth}</label>
                    <input
                        id="brushSize"
                        type="range"
                        min="1"
                        max="100"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(Number(e.target.value))}
                        className="w-32 cursor-pointer"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={undo} className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm">Undo</button>
                    <button onClick={clearCanvas} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm">Clear</button>
                    <button onClick={downloadImage} className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm">Download</button>
                </div>
            </div>
        </div>
    );
};

export default Whiteboard;