import React, { useRef, useEffect, useState, useCallback } from 'react';

const useWhiteboard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#FFFFFF');
    const [lineWidth, setLineWidth] = useState(5);
    const [history, setHistory] = useState<string[]>([]);
    const historyIndex = useRef(-1);

    const saveState = useCallback(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();

        // If we have undone, and then draw again, we want to remove the future states
        const newHistory = history.slice(0, historyIndex.current + 1);
        newHistory.push(dataUrl);
        setHistory(newHistory);
        historyIndex.current = newHistory.length - 1;
    }, [history]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const setCanvasDimensions = () => {
            const container = canvas.parentElement;
            if (!container) return;

            const { width, height } = container.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            if(context) {
                context.lineCap = 'round';
                context.strokeStyle = color;
                context.lineWidth = lineWidth;
                contextRef.current = context;
                 // After resizing, redraw the last state
                if (history[historyIndex.current]) {
                    const img = new Image();
                    img.src = history[historyIndex.current];
                    img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            }
        };

        setCanvasDimensions();
        
        // Initial blank state
        saveState();

        const resizeObserver = new ResizeObserver(setCanvasDimensions);
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }


        return () => {
            if (canvas.parentElement) {
                resizeObserver.unobserve(canvas.parentElement);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
        }
    }, [color]);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.lineWidth = lineWidth;
        }
    }, [lineWidth]);

    const getCoords = (event: MouseEvent | TouchEvent | React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { offsetX: 0, offsetY: 0 };
        const rect = canvas.getBoundingClientRect();

        if (event instanceof MouseEvent || 'clientX' in event) {
            return { offsetX: (event as MouseEvent).clientX - rect.left, offsetY: (event as MouseEvent).clientY - rect.top };
        }
        if (event instanceof TouchEvent || 'touches' in event) {
            const touchEvent = event as TouchEvent;
            if (touchEvent.touches && touchEvent.touches.length > 0) {
                 return {
                    offsetX: touchEvent.touches[0].clientX - rect.left,
                    offsetY: touchEvent.touches[0].clientY - rect.top
                };
            }
        }
        return { offsetX: 0, offsetY: 0 };
    };

    const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = getCoords(event.nativeEvent);
        if(!contextRef.current) return;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }, []);

    const stopDrawing = useCallback(() => {
        if(!contextRef.current) return;
        contextRef.current.closePath();
        if (isDrawing) {
            saveState();
        }
        setIsDrawing(false);
    }, [isDrawing, saveState]);

    const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !contextRef.current) return;
        const { offsetX, offsetY } = getCoords(event.nativeEvent);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }, [isDrawing]);

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            setHistory([]);
            historyIndex.current = -1;
            saveState(); // Save the cleared state
        }
    }, [saveState]);

    const undo = useCallback(() => {
        if (historyIndex.current > 0) {
            historyIndex.current -= 1;
            const canvas = canvasRef.current;
            const context = contextRef.current;
            if (canvas && context) {
                const img = new Image();
                img.src = history[historyIndex.current];
                img.onload = () => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
            }
        }
    }, [history]);
    
    const downloadImage = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const link = document.createElement('a');
        link.download = 'cosmic-canvas-drawing.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return {
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
    };
};

export default useWhiteboard;